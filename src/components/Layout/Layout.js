import React, { Component } from 'react';
import clases from './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

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
                <Toolbar  drawerToggleClicked={ this.drawerToggleClicked } />
                <SideDrawer 
                    open={ this.state.showSideDrawer } 
                    closed={ this.sideDrawerClosedHandler } />
                <main className={ clases.Content }>
                    { this.props.children }
                </main>
            </Aux>            
        );
    }   
}

export default Layout;