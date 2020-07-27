import React from 'react';
import clases from './Layout.css';

import Aux from '../../hoc/Aux';

const layout = (props) => (
    <Aux>
        <div>
            Toolbar, Sidebar, Backdrop
        </div>
        <main className={ clases.Content }>
            { props.children }
        </main>
    </Aux>
    
);


export default layout;