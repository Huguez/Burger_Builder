import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'



class OrderSummary extends Component{
    
    render(){
        const ingredientSummary =  Object.keys( this.props.ingredientes ).map( 
            igKey => {
                return( 
                    <li key={ igKey }>
                        <span style={ { textTransform: 'capitalize' } } >
                            { igKey }
                        </span>: { this.props.ingredientes[igKey] }
                    </li>)
            }
        );

        return (
            <Aux>
                <h3>Your Order</h3>
                <p> A la Burguer!!! </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong> Total Price: { this.props.price }  </strong>  </p>
                <p> Continue to Checkout? </p>
                <Button clicked={ this.props.purchaseCanceled } btnType="Danger">Cancel</Button>
                <Button clicked={ this.props.purchaseContinued } btnType="Success">Continue</Button>
            </Aux>
        );
    }
} 
export default OrderSummary;