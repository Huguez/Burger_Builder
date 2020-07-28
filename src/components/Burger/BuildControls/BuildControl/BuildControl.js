import React from 'react';
import classes from './BuildControl.css';

const BuildControl = ( props ) => (
    <div className={ classes.BuildControl }>
        <div className={ classes.Label }>{ props.label }</div>
        <button  disabled={ props.disabled } onClick={ props.remove } className={ classes.Less }> Less </button>
        <button  onClick={ props.add } className={ classes.More }> More </button>
    </div>
);

export default BuildControl;