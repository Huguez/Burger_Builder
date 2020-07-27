import React, { Component } from 'react';
import clases from './BurgerIngredients.css'
import propTypes from 'prop-types';


class BurguerIngredients extends Component {

    render(){
        let ingrediente = null;

        switch( this.props.type ){
            case ('bread-bottom'):
                ingrediente = <div className={ clases.BreadBottom }></div>
                break;
            case ('bread-top'):
                ingrediente = (
                    <div className={ clases.BreadTop }>
                        <div className={ clases.Seeds1 }></div>
                        <div className={ clases.Seeds2 }></div>
                    </div>
                );
                break;
            case ('meat'):
                ingrediente = <div className={ clases.Meat }></div>
                break;
            case ('bacon'):
                ingrediente = <div className={ clases.Bacon }></div>
                break;
            case ('salad'):
                ingrediente = <div className={ clases.Salad }></div>
                break;
            case ('cheese'):
                ingrediente = <div className={ clases.Cheese }></div>
                break;
            default:
                ingrediente = null;
                break;
        }
        return ingrediente;
    }
}

BurguerIngredients.propTypes = { 
    type: propTypes.string.isRequired 
 };



export default BurguerIngredients;