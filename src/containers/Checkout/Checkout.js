import React from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { connect } from 'react-redux'

import { Route, Redirect }from 'react-router-dom';
import ContactData from './ContactData/ContactData'


const checkout = props => {
    
    const cancel = () =>{
        props.history.goBack();
    }

    const continueHandler = () =>{
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to='/' />;
    
    if( props.ings ){
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = ( 
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    onCheckoutCancelled={ cancel }
                    onCheckoutContinue={ continueHandler }
                    ingredientes={ props.ings }/>
                <Route path={ props.match.path + '/contact-data' }  component={ ContactData } />
            </div> 
        );
    }
    
    return ( 
        <div>
            { summary }
        </div>
    );
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.puschased
    };
}

export default connect( mapStateToProps )( checkout );