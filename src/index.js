import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Cpt from './components';
 
console.log('Looks like we are in development mode: ' + process.env.NODE_ENV);

const render = (Component) => {
        ReactDOM.render(<AppContainer>
                <Component/>
        </AppContainer>, document.body)
};
render(Cpt);

if (module.hot) {
        module.hot.accept('./components', () => {
                render(Cpt)
        });
}
