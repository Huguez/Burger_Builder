import React from 'react';

const input = ( props ) =>{
    let inputElement = null;

    switch( props.inputType ){
        case('input'):
            inputElement = <input className={ classes.InputElement  } { ...props }  />
        case('textarea'):
            inputElement = <textarea className={ classes.InputElement } { ...props } />
        default:
            inputElement = <input className={ classes.InputElement } {...props}/>

    }
    return ( <div className={ classes.Input }>
        <label className={ classes.Label }>{ props.label }</label>
        { inputElement }
    </div> )

}

export default input;