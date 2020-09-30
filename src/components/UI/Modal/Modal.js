import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    
    // shouldComponentUpdate( nextProps, nextState ){
    //     return nextProps.show !== this.props.show  ||  nextProps.children !== this.props.children;
    // }

    return ( 
        <Aux>
            <Backdrop show={ props.show } clicked={ props.modalClose }  />
            <div
                className={ classes.Modal} 
                style={ { opacity: props.show ? '1': '0', transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' } } >
                { props.children }
            </div>
        </Aux>
    );
}

 export default React.memo( modal, ( prevProps, nextProps ) => { return nextProps.show !== prevProps.show  ||  nextProps.children !== prevProps.children } );