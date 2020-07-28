import React from 'react';
import Aux from '../../../hoc/Aux';

import Button from '../../UI/Button/Button'


const orderSummary = ( props ) =>{
    const ingredientSummary =  Object.keys( props.ingredientes ).map( 
        igKey => {
            return( 
                <li key={ igKey }>
                    <span style={ { textTransform: 'capitalize' } } >
                        { igKey }
                    </span>: { props.ingredientes[igKey] }
                </li>)
        }
    )

    return (
        <Aux>
            <h3>Your Order</h3>
            <p> A la Burguer!!! </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total Price: { props.price }  </strong>  </p>
            <p> Continue to Checkout? </p>
            <Button clicked={ props.purchaseCanceled } btnType="Danger">Cancel</Button>
            <Button clicked={ props.purchaseContinued } btnType="Success">Continue</Button>
        </Aux>
    );
}

export default orderSummary;