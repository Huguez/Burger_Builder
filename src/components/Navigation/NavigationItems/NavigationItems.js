import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = () => ( 
    <ul className={ classes.NavigationItems }>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders" > Orders </NavigationItem>
    </ul>
);

export default navigationItems;