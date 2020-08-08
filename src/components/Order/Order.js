import React from 'react';

import classes from './Order.css';

const order = ( props ) => {
    const ingredientes = [];

    for( let name in props.ingredients ){
        ingredientes.push( { nombre: name, amount: props.ingredients[name]} );
    }

    const otput = ingredientes.map( ig => {
        return <span 
            key={ ig.nombre }
            style={{ 
                textTransform: 'capitalize', 
                display: "inline-block", 
                margin:'8px', 
                border: '1px solid #ccc', 
                padding: '5px' }}> { ig.nombre } ( { ig.amount } ) </span>;
    } );

    return( 
        <div className={ classes.Order }>
            <p>Ingredientes: { otput } </p>
            <p>Precio: <strong> USD ${ Number.parseFloat( props.price ).toFixed( 2 )  } </strong> </p>
        </div>
    );
}

export default order;