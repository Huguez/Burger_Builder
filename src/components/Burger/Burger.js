import React from 'react';
import classes from './Burger.css';
import BurgerIngrediant from './BurgerIngredients/BurgerIngredients';


const burger = ( props ) => {
    return (
        <div className={ classes.Burger }>
            <BurgerIngrediant type="bread-top" />        
            <BurgerIngrediant type="cheese" />        
            <BurgerIngrediant type="meat" />        

            <BurgerIngrediant type="bread-bottom" />        
        </div>
    );
}

export default burger;