import React, { Component, PureComponent } from 'react'

function withForm ({ inputs }) {
    return (WrappedComponent, asNonPure=false) => {

        /**
         * The namespace of the input which will
         * contain the default input to focus on when 
         * wrapped component mounts (if available)
         */
        let defaultFocusInput = '';

        for(let [namespace, { focusOnMount }] of Object.entries(inputs)) {
            if(focusOnMount) {
                defaultFocusInput = namespace;
                break;
            }
        }

        let ComponentType = asNonPure ? Component : PureComponent;

        class InputComponentsHOC extends ComponentType {
            constructor(props) {
                super(props);

                /** 
                 * Any element or React element refs are
                 * to be added to this namespace for simplicity
                 * and convenience with IDE
                 **/
                this.R = { componentRef : undefined };

                this.listeners = {};

                let initialState = { context : { values : {} }};

                for(let namespace of Object.keys(inputs)) {
                    initialState.context.values[namespace] = '';
                }

                for(let [namespace, { elementId, validate } ] of Object.entries(inputs)) {

                    // for each input of [xxx], create a 
                    // change listener in the form "onChange[Xxx]" 
                    // These callbacks detect input changes, and sets 
                    // state[xxx] to the new input values. 
                    // They are made available to the HOC's wrapped
                    // components via props.

                    let capitalizedName = namespace.charAt(0).toUpperCase() + 
                                                            namespace.substr(1);

                    let inputValueNs = `${namespace}InputValue`;


                    let listenerNS = `onChange${capitalizedName}`;
                    this.listeners[listenerNS] = (event)=> {
                        let { value } = event.target;
                        
                        let context = { ...this.state.context };
                        context.values[namespace] = value;

                        context.revalidate = (namespaces) => {
                            let contextSupplied = { 
                                ...context,
                                values : Object.assign({}, 
                                    context.values, { [namespace] : value }
                                )
                            };

                            let newErrorState = this.validateInputs(namespaces, contextSupplied);

                            if(newErrorState) {
                                this.setState(newErrorState);
                            }
                        };

                        let nextState = { [inputValueNs] : value, context };

                        let nextErrorState = this.validateInputs([namespace], context)
                        if(nextErrorState) {
                            nextState = Object.assign(nextState, nextErrorState);
                        }

                        this.setState(nextState);
                    }

                    // also be sure while iterating to assign a default
                    // value to inputs so that they do not register as
                    // "uncontrolled" and start to throw React warnings
                    
                    initialState[inputValueNs] = '';
                }

                this.state = initialState;
            }

            validateInputs = (namespaces, context) => {
                let nextErrorState = {};

                for(let ns of namespaces) {
                    let value = context.values[ns];
                    let error = this.validate(ns, value, context);
                    
                    nextErrorState[`${ns}InputError`] = error;
                }

                if(Object.keys(nextErrorState).length) {
                    return nextErrorState;
                } else {
                    return undefined;
                }
            };

            /**
             * Returns whether or not a namespace
             * is valid with a given value with
             * another context.
             * 
             * Note : we are returning rather than
             * directly setting state so we can aggregate 
             * multiple validation checks before setting 
             * state here and avoid perf hits.
             * 
             */
            validate = (namespace, value, context) => {
                switch(typeof inputs[namespace].validate) {
                    case 'function':
                        return inputs[namespace].validate({ context, value });
                    case 'object':
                        let { validate } = inputs[namespace];
                        if(validate.regex && validate.errorMessage) {
                            let { regex, errorMessage } = validate;
                            return !value.match(regex) ? errorMessage : '';
                        } else {
                            return '';
                        }
                }
            };

            componentDidMount () {
                document.addEventListener('keypress', this.onKeyPressed);

                for(let [namespace, { elementId }] of Object.entries(inputs)) {   
                    let element = document.getElementById(elementId);

                    if(element) {
                        this.R[`${namespace}Ref`] = element;

                        // allows for keyboard navigation
                        // (must be specified because MUI
                        // lib hides input component)

                        this.R[`${namespace}Ref`].tabIndex = 0;
                    }
                }

                if(defaultFocusInput && this.R[`${defaultFocusInput}Ref`]) {
                    this.R[`${defaultFocusInput}Ref`].focus();
                }
            }

            componentWillUnmount () {
                document.removeEventListener('keypress', this.onKeyPressed);

                // element references should be let
                // go to free up RAM

                for(let [namespace, element] of Object.entries(this.R)) {
                    this.R[`${namespace}Ref`] = '';
                }
            }

            /**
             * Listens for the enter key and
             * if one of our inputs are focused,
             * apply a supplied action (via an input.onAction callback)
             * run from the wrapped component's scope
             */
            onKeyPressed = (event) => {
                switch(event.keyCode) {
        
                    case 13:   // ENTER
                        let activeElement = document.activeElement;

                        for (const [ namespace, { onAction, elementId } ] of Object.entries(inputs)) {
                            let element = this.R[`${namespace}Ref`];
                            if(element == activeElement && onAction) {
                                onAction.apply(this.R.componentRef, this.props);
                            }
                        }
                }
            };

            render () {
                let { componentRef, ...refs } = this.R; 

                return (
                    <WrappedComponent 
                        ref={ c => this.R.componentRef = c }
                        { ...this.props }
                        { ...this.state }
                        { ...this.listeners }
                        { ...refs }
                    />
                );
            }
        }

        return InputComponentsHOC;
    };
}

export default withForm