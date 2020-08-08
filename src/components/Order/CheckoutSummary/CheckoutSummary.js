import React from "react";

import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css';

const CheckoutSummary =(props) =>{
    
    // console.log("CheckoutSummary.js", props.ingredientes);
    
    return (
        <div className={ classes.CheckoutSummary }>
            <h1> Buen provecho bato !!! </h1>
            <div style={{ width:'100%', height: '300px', margin: 'auto' }}>
                <Burger ingredientes={ props.ingredientes } />
            </div>
            <Button btnType="Danger"  clicked={props.onCheckoutCancelled} >Cancel</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinue}  >Continue</Button>
        </div>
    );
}

export default CheckoutSummary;