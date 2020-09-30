import React, { useEffect, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Orders = React.lazy( () =>{
  return import ('./containers/Orders/Orders');
});

const Auth = React.lazy( () =>{
  return import ('./containers/Auth/Auth');
});

const Chechout = React.lazy( () =>{
  return import ('./containers/Checkout/Checkout');
});

const app = props => {
  
  useEffect( () => {
    props.onTryAutoSignUp();
  }, [] );
  
  let routes = ( 
    <Switch>
      <Route path='/auth' render={ () => <Auth/> } />
      <Redirect to='/auth' />
    </Switch>
  );

  if( props.isAuthenticated ){
    routes = ( 
      <Switch>
        <Route path='/auth'     render={ () =>  <Auth/>  } />
        <Route path='/logout'   render={ () =>  <Logout/>  } />
        <Route path='/checkout' render={ () =>  <Chechout/>  } />
        <Route path='/orders'   render={ () =>  <Orders/>  } />
        <Route path='/' exact   render={ () =>  <BurgerBuilder/>  } /> 
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense  fallback={ <p> Loading... </p> }> { routes } </Suspense>
      </Layout>
    </div>
  );
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(app) );