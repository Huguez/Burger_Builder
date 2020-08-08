import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import instance from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading:true
    }
    
    componentDidMount(){
        instance.get( '/orders.json' ).then( ( resp ) =>{
            const fetchOrders = [];
            let aux;
            for( let key in resp.data ){
                fetchOrders.push( { ...resp.data[key], id: key } );

                aux = resp.data[key].ingredients;
                console.log( aux );

            }

            this.setState( { loading: false, orders: fetchOrders } );

        }).catch( err => this.setState({ loading: false }) )
    }

    render(){
        return (  <div> <Order/> </div> );
    }
}

export default withErrorHandler(Orders, instance );