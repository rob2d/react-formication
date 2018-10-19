# react-formication

Simple, thoughtful and explicitly declarative HOC to create dependency-free, efficient, and painless dynamic input validation with your forms (pun intended).


## Overview

1. [Installation](#installation)

2. [Why should I use this library?](#yet-another-form-library?)

3. [Example](#examples)

4. [Important Note](#important-note)


## Installation

```npm i --save-dev react-formication```



## Yet Another Form Library?

While there are great libraries available with obviously tons of smart people/effort put in (see [Formik](https://github.com/jaredpalmer/formik)), they tend to have a lot of unneeded dependencies and a bit of bloat when you are already depending on UI libraries (e.g. [Material-UI](http://www.material-ui.com)) or want to roll something with minimal overhead on an SPA (e.g. older JS solutions such as `lodash`) when we already transpile ES7 code as part of our React workflow. The code in this library as bundled is only 6kb in your app before gzipping.



In addition,  this library provides the following benefits for your React application over others:

- it uses a concise [High-Order-Component](https://reactjs.org/docs/higher-order-components.html) pattern that is extremely readable in nature.
- revalidation of fields based on other fields using either regex or functions.
- setting any field value when another one changes (without a ton of processing overhead).
- a very simple **context** interface object in your form definitions (not to be confused with React's) for referencing/updating/changing other props when validating.
- can access `this` of `Component` context when revalidating for flexibility/freedom of developer choice.
- props from inputs are given to you flatly as primitives; this prevents us from worrying about immutability/accidental re-renders (as well as dependency/magic internally).
- prop names are extremely explicit. When you work on a team or grow your team, this is great for the hassle of **[OPC](https://abstrusegoose.com/strips/you_down_wit_OPC-yeah_you_know_me.png)**. For example, a username value would be `usernameInputValue`
- can use `PureComponent` or `Component` interface, depending on how you roll philosophically on this stuff (or just how this form is used in your overall UI architecture).



## Usage Example ##

Below is an example of a fully dynamically validating standard username signup form (some things left out for obvious brevity)

```react
import React, { Fragment } from 'react'
import withForm from 'react-formication'
import RegexConstants from 'my-library-constants'
import { TextInput, CreateAccountButton } from 'my-library'

let formOptions = {
    inputs :  {
        email : {
            elementId : 'createacct-email-input',
            focusOnMount : true,
            validate : {
                regex : RegexPatterns.EMAIL,
                errorMessage : 'Email must be entered in a standard format'
            }
        },
        username : {
            elementId : 'createacct-username-input',
            onAction ({ }) { 
                this.props.passwordRef.focus() 
            },
            validate ({ value, context }) {
                if(value.length < 3) {
                    return 'username must be at least 3 characters long';
                }

                if(value.length > 11) {
                    return 'username cannot exceed 11 characters';
                }
            }
        },
        password : {
            elementId : 'createacct-password-input',
            onAction ({ }) { 
                this.props.passwordX2Ref.focus()
            },
            validate ({ value, context : { revalidate } }) {
                revalidate(['passwordX2']);
                
                // TODO : validate password patterns
                // for length and variety of character
                // types
            }
        },
        passwordX2 : {
            elementId : 'createacct-passwordx2-input',
            onAction ({ context }) {
                
            },
            validate ({ value, context }) {
                let { values } = context;
                if(values.password.length && 
                    (values.password !== value) && 
                    (value.length > 2)
                ) {
                    return 'passwords must match';
                }
            }
        }
    },
    submitButton : {
        elementId : 'createacct-submit-button'
    },
    onSubmit : ({ context }) => {
        
        // TODO : launch some submit action binded
        // to "this" context of component and
        // able to use form context actions
        // and values

    }
};

class MyFormLayout (props) {
    
    render () {
     	const { 
            actionState,
            createAccount,
            usernameInputValue,   usernameInputError,   onChangeUsername,
            passwordInputValue,   passwordInputError,   onChangePassword,
            passwordX2InputValue, passwordX2InputError, onChangePasswordX2,
            emailInputValue,      emailInputError,      onChangeEmail
    	} = this.props;
    
       return (
                <Fragment>
                    <TextInput
                        label={'Email Address'}
                        name={'email'}
                        value={emailInputValue}
                        error={emailInputError}
                        onChange={onChangeEmail}
                        iconClass={'mdi mdi-email'}
                        elementId={'createacct-email-input'}
                    />
                    <TextInput
                        label={'Username'}
                        name={'username'}
                        value={usernameInputValue}
                        error={usernameInputError}
                        onChange={onChangeUsername}
                        iconClass={'mdi mdi-account'}
                        elementId={'createacct-username-input'}
                    />
                    <TextInput
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        error={passwordInputError}
                        value={passwordInputValue}
                        onChange={onChangePassword}
                        iconClass={'mdi mdi-lock-question'}
                        elementId={'createacct-password-input'}
                    />
                    <TextInput
                        label={'Repeat Password'}
                        name={'repeatPassword'}
                        type={'password'}
                        value={passwordX2InputValue}
                        error={passwordX2InputError}
                        onChange={onChangePasswordX2}
                        id={'createacct-passwordx2-input'}
                    />
                    <CreateAccountButton 
                        actionState={actionState} 
                        onClick={createAccount}
                    />
                </Fragment>
            );   
        }
    }
}

const MyForm = withForm(formOptions)(MyFormLayout);

export default MyForm
```



## Important Note

This is a very W.I.P. library as I have just exported it (09/09/2018). Many things should be added and clearly documentation is a bit lacking. I do dogfood this in some serious applications however and this should evolve quickly.

If you do have any issues, please feel free to submit as I appreciate any feedback! P.R.s and discussion for changes are also welcome.



Thanks.
