import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = ( props ) => ( 
    <Aux>
        <Backdrop show={ props.show } clicked={ props.modalClose }  />
        <div
            className={ classes.Modal} 
            style={ { opacity: props.show ? '1': '1', transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' } } >
            { props.children }
        </div>
    </Aux>
);

 export default modal;