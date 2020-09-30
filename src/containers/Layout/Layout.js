import React, { useState } from 'react';
import { connect } from 'react-redux';

import clases from './Layout.css';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const layout = props => {
    // state = {
    //     showSideDrawer: false
    // }
    const [ showSideDrawer, setShowSideDrawer ] = useState( false );
    
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer( false );
    }

    const drawerToggleClicked = () => {
        setShowSideDrawer( !showSideDrawer );
    }
    
    return (
        <Aux>
            <Toolbar isAuth={ props.isAuthenticated }   drawerToggleClicked={ this.drawerToggleClicked } />
            <SideDrawer 
                isAuth={ props.isAuthenticated }
                open={ showSideDrawer } 
                closed={ sideDrawerClosedHandler } />
            <main className={ clases.Content }>
                { props.children }
            </main>
        </Aux>            
    );
}


const mapStateToProps = state => {
    // console.log(state);
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default  connect( mapStateToProps )(layout);