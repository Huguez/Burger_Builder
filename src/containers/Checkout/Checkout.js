import React , { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

import { Route }from 'react-router-dom';
import ContactData from './ContactData/ContactData'


class Checkout extends Component {
    state={
        ingredients:{
            salad:  0,
            cheese: 0,
            bacon:  0,
            meat:   0
        }
    }

    componentDidMount(){
        const query = new URLSearchParams( this.props.location.search );
        const ingredientes= {};

        for( let param of query.entries() ){
            ingredientes[param[0]] = parseInt(param[1], 10);
        }
        
        
        this.setState( { ingredients: ingredientes } );
        
        // console.log(this.state.ingredients);
        
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
                    ingredientes={ this.state.ingredients }/>
                <Route  path={ this.props.match.path + '/contact-data' }  component={ ContactData } />
            </div>
        );
    }
}

export default Checkout;