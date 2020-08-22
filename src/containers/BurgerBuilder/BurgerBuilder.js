import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actionTypes from '../../store/actions/actionsTypes';

import Aux from '../../hoc/Aux/Aux';

import Burger from  '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/spinner/spinner'
import instance from '../../axios-orders';


import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    
    state = {
        purchasing: false
    };    

    updatePurchaseableState( ing ){
        // const ing ={
        //     ...this.state.ingredientes
        // };
        
        const sum = Object.keys( ing ).map(
            ( igKey )=>{
                return ing[igKey]
            }
        ).reduce( ( sum, el ) => {
            return sum +el;
        }, 0 );

        return sum > 0 ;

    }

    puchase = () =>  {
        if( this.props.isAuthenticated ){
            this.setState( { purchasing: true } );
        }else{
            this.props.onSetRedirectPath( '/checkout' )
            this.props.history.push( '/auth' );
        }
    }

    cancelPuchase = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinue = () => {
        // let queryParams = [];
        // for( let i in this.state.ingredientes ){
        //     queryParams.push( encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredientes[i]) );
        // }

        // queryParams.push( 'price=' + this.state.totalPrice );
        
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        // console.log("BurgerBuilder.js", queryString );
    }

    componentDidMount(){
        // console.log(this.props );
        this.props.onInitIngredients( this.props.token );
        // instance.get( 'https://burguer-app-b2532.firebaseio.com/ingrediendts.json' ).then( response =>{ 
        
        //     this.setState({ ingredientes: response.data });

        //     // console.log(response.data); 
        // } ).catch( error =>{ this.setState( { error: true } ) } );

    }

    render(){
        const disableInfo = { ...this.props.ings };
        
        let count = 0;
        
        for (let key in disableInfo) {
            count = disableInfo[key] > 0 ?  count + 1 : count ;
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        // const boleano = count >= 1 ? true : false;

        let orderSummary = null

        let burger = this.props.error ? <h3 style={{ textAlign : 'center' }} >Los Ingredientes No pueden cargar!!! </h3> : <Spinner />;

        if( this.props.ings ){
            // console.log( "BurgerBuilder ", this.props.ings);
            burger = (
                <Aux>
                    <Burger ingredientes={ this.props.ings }/>
                    <BuildControls
                        ordered={ this.puchase } 
                        purchasable={ this.updatePurchaseableState( this.props.ings ) }
                        price={ this.props.price } 
                        disable={ disableInfo } 
                        removed={ this.props.onIngredientRemoved }
                        isAuth={ this.props.isAuthenticated } 
                        added={ this.props.onIngredientAdded } />
                </Aux>
            );
            orderSummary = <OrderSummary
                            price={ this.props.price }  
                            purchaseCanceled={ this.cancelPuchase }
                            purchaseContinued={ this.purchaseContinue }
                            ingredientes={ this.props.ings } />

        }

        return (
            <Aux>
                <Modal show={ this.state.purchasing } modalClose={ this.cancelPuchase }  >
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    // console.log  ( state );
    return {
        price: state.burgerBuilder.totalPrice,
        ings:  state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {

    return {
        onIngredientAdded: (ingName) => dispatch( burgerBuilderActions.addIngredient( ingName ) ),
        onIngredientRemoved: (ingName) => dispatch( burgerBuilderActions.removeIngredient( ingName ) ),
        onInitIngredients: (token) => dispatch( burgerBuilderActions.initIngredients(token) ) ,
        onInitPurchase: () => dispatch( burgerBuilderActions.purchaseInit() ),
        onSetRedirectPath: (path) => dispatch( burgerBuilderActions.setAuthRedirectPath( path ) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler(BurgerBuilder, instance) );