import React from 'react';
import classes from './Modal.css'

const modal = ( props ) => ( 
    <div
        className={ classes.Modal} 
        style={ { opacity: props.show ? '1': '1', transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' } } >
        { props.children }
    </div>
);

 export default modal;