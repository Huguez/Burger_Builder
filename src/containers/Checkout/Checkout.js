import React , { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'


class Checkout extends Component {
    state={
        ingredients:{
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        }
    }

    cancel = () =>{
        this.props.history.goBack();
    }

    continue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return ( 
            <div>
                <CheckoutSummary 
                    onCheckoutCancelled={ this.cancel }
                    onCheckoutContinue={ this.continue }
                    ingredients={ this.state.ingredients }/>
            </div>
        );
    }
}

export default Checkout;