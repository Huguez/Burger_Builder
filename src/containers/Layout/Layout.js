import React, { Component } from 'react';
import { connect } from 'react-redux';

import clases from './Layout.css';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    drawerToggleClicked = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    
    render(){
        return (
            <Aux>
                <Toolbar isAuth={ this.props.isAuthenticated }   drawerToggleClicked={ this.drawerToggleClicked } />
                <SideDrawer 
                    isAuth={ this.props.isAuthenticated }
                    open={ this.state.showSideDrawer } 
                    closed={ this.sideDrawerClosedHandler } />
                <main className={ clases.Content }>
                    { this.props.children }
                </main>
            </Aux>            
        );
    }   
}


const mapStateToProps = state => {
    // console.log(state);
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default  connect( mapStateToProps )(Layout);