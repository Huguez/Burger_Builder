import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import instance from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/spinner';


const orders = props => {
    
    useEffect(  () =>  {
        // console.log( this.props.token );
        props.onFetchOrders( props.token, props.userId );
    }, [] );

    let orders = <Spinner />;
    if( !props.loading ){
        orders = (
            props.orders.map( ( order ) => {
                return <Order price={order.price }
                                ingredients={ order.ingredients }  
                                key={ order.id } />
            } )
        );
    }

    return (
        <div>
            { orders }
        </div>
    );
}

const mapStateToProps = state => {
     return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
     }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch( action.fetchOrders( token, userId ) )
    };
}

export default  connect( mapStateToProps, mapDispatchToProps ) (withErrorHandler( orders, instance ) );