import React from 'react';
import clases from './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar'


const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={ clases.Content }>
            { props.children }
        </main>
    </Aux>
    
);


export default layout;