import React , { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { connect } from 'react-redux'

import { Route, Redirect }from 'react-router-dom';
import ContactData from './ContactData/ContactData'


class Checkout extends Component {
    // state={
    //     ingredients: null,
    //     totalPrice: null
    // }

    // UNSAFE_componentWillMount(){
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredientes= {};

    //     let price = 0.0;
        
    //     for( let param of query.entries() ){

    //         if( param[0] === 'price' ){
    //             price = parseFloat( param[1] );
    //         }else{
    //             ingredientes[param[0]] = parseInt(param[1], 10);
    //         }
    //     }
        
    //     this.setState( { ingredients: ingredientes, totalPrice: price} );
    // }

    UNSAFE_componentWillMount(){
        // console.log( this.props );
        // this.props.onInitPurchase();
    }

    cancel = () =>{
        this.props.history.goBack();
    }

    continue = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to='/' />;
        // console.log(" Checkout ", this.props.ings);
        if( this.props.ings ){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = ( 
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        onCheckoutCancelled={ this.cancel }
                        onCheckoutContinue={ this.continue }
                        ingredientes={ this.props.ings }/>);
                    <Route path={ this.props.match.path + '/contact-data' }  component={ ContactData } />
                </div> 
            );
        }
        return ( 
            <div>
                { summary }
            </div>
        );
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.puschased
    };
}

export default connect( mapStateToProps )( Checkout );