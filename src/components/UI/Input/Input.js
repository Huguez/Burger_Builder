import React from 'react';
import classes from './Input.css';

const input = ( props ) =>{
    let inputElement = null;
    const inputClasses = [ classes.InputElement ];
    
    if( props.invalid && props.shouldValidate && props.touched ){
        inputClasses.push( classes.Invalid );
    }    

    switch( props.inputtype ){
        case('input'):
            inputElement = <input onChange={ props.changed } className={ inputClasses.join(' ')  }  value={ props.value } { ...props.elementConfig }/>
            break;
        case('select'):
            inputElement = (
                <select onChange={ props.changed } className={ inputClasses.join(' ') }  value={ props.value }>
                    { props.elementConfig.options.map( ( op ) => { 
                        return <option key={ op.value } value={ op.value } > { op.displayValue } </option>
                    } ) }
                </select> )
            break;
        case('textarea'):
            inputElement = <textarea onChange={ props.changed }  className={ inputClasses.join(' ') } value={ props.value } { ...props.elementConfig } />
            break;
        default:
            inputElement = <input onChange={ props.changed } className={ inputClasses.join(' ')  }  value={ props.value } { ...props.elementConfig } />
            break;
    }

    let validationError = null;
    if( props.invalid && props.touched ){
        validationError = <p className={ classes.ValidationError }> datos incorrectos hacker!!!! </p>
    }
    
    return ( 
        <div className={ classes.Input }>
            <label className={ classes.Label }>{ props.label }</label>
            { inputElement }
            { validationError }
        </div>
    )

}

export default input;