import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/asyncComponent/asyncComponent'; 

const asyncOrders = asyncComponent( () =>{
  return import ('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent( () =>{
  return import ('./containers/Auth/Auth');
});

const asyncChechout = asyncComponent( () =>{
  return import ('./containers/Checkout/Checkout');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = ( 
      <Switch>
        <Route path='/auth' component={ asyncAuth } />
        <Redirect to='/auth' />
      </Switch>
    );

    if( this.props.isAuthenticated ){
      routes = ( 
        <Switch>
          <Route path='/auth' component={ asyncAuth } />
          <Route path='/logout' component={ Logout } />
          <Route path='/checkout' component={ asyncChechout } />
          <Route path='/orders' component={ asyncOrders } />
          <Route path='/' exact component={ BurgerBuilder } /> 
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
            { routes }
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated: state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp: () => dispatch( actions.authCheckState() )
  }
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(App) );