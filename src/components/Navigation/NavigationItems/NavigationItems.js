import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = (props) => ( 
    <ul className={ classes.NavigationItems }>

        <NavigationItem exact link="/burger">Burger Builder</NavigationItem>
        
        { props.isAuthenticated ? <NavigationItem link="/orders" > Orders </NavigationItem> : null }

        { !props.isAuthenticated ?  
        <NavigationItem link="/auth" > Authenticate </NavigationItem> :  
        <NavigationItem link="/logout" > Log out </NavigationItem> }
        
    </ul>
);

export default navigationItems;