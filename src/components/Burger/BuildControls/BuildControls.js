import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls =[
    { label: 'Salad',  type: 'salad'  },
    { label: 'Bacon',  type: 'bacon'  },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat',   type: 'meat'   }
];


const BuildControls = (props) => (
    <div className={ classes.BuildControls }> 
        <p className={ classes.price  }> Current Price: <strong> { Number.parseFloat( props.price ).toFixed( 2 )  } </strong>  </p>
        { controls.map( ctrl=> ( 

            <BuildControl 
                disabled={ props.disable[ctrl.type] }
                type={ ctrl.type }
                remove={ () => props.removed( ctrl.type ) }
                add={ () => props.added( ctrl.type ) }
                key={ ctrl.label }
                label={ ctrl.label } />
         ) ) }
         <p>  test: { !props.purchasable } </p>
         <button  
            onClick={ props.ordered }
            disabled={ !props.purchasable } className={ classes.OrderButton }> Order Now </button>
    </div>
);

export default BuildControls;