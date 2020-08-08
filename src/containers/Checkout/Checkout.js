import React , { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

import { Route }from 'react-router-dom';
import ContactData from './ContactData/ContactData'


class Checkout extends Component {
    state={
        ingredients: null,
        totalPrice: null
    }

    UNSAFE_componentWillMount(){
        const query = new URLSearchParams( this.props.location.search );
        const ingredientes= {};

        let price = 0.0;
        
        for( let param of query.entries() ){

            if( param[0] === 'price' ){
                price = parseFloat( param[1] );
            }else{
                ingredientes[param[0]] = parseInt(param[1], 10);
            }
        }
        
        this.setState( { ingredients: ingredientes, totalPrice: price} );
    }

    cancel = () =>{
        this.props.history.goBack();
    }

    continue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        // console.log(this.state.totalPrice);
        return ( 
            <div>
                <CheckoutSummary 
                    onCheckoutCancelled={ this.cancel }
                    onCheckoutContinue={ this.continue }
                    ingredientes={ this.state.ingredients }/>
                <Route path={ this.props.match.path + '/contact-data' }  render={ ()=> <ContactData  {...this.props} ingredientes={ this.state.ingredients } price={ this.state.totalPrice }  /> } />
            </div>
        );
    }
}

export default Checkout;