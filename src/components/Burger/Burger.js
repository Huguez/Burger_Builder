import React from 'react';
import classes from './Burger.css';
import BurgerIngrediant from './BurgerIngredients/BurgerIngredients';

const burger = ( props ) => {
    // console.log("Burger.js->", props);
    
    let transformedIngredientes = Object.keys( props.ingredientes ).map(
        ( igKey ) => {
            return [...Array( props.ingredientes[igKey] ) ].map( 
                (_, i) => {
                    // console.log("Burger.js", igKey, i);
                    return <BurgerIngrediant key={  igKey +"_"+ i } type={ igKey } /> 
                } 
            )
        }
    ).reduce( ( arr, el ) =>{
        return arr.concat( el )
    }, [] );
    
    if( transformedIngredientes.length === 0 ){
        transformedIngredientes = <p> Introducca Ingredientes, Por Favor! </p>;
    }
    
    return (
        <div className={ classes.Burger }>
            <BurgerIngrediant type="bread-top" /> 
            { transformedIngredientes }
            <BurgerIngrediant type="bread-bottom" /> 

        </div>
    );
}

export default burger;