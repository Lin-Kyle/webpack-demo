import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Cpt from 'Component';

console.log('Looks like we are in mode: ' + process.env.NODE_ENV);

const render = (Component) => {
        ReactDOM.render(<AppContainer>
                <Component/>
        </AppContainer>, document.getElementById('app'))
};
render(Cpt);

if (module.hot) {
        module.hot.accept('./components', () => {
                render(Cpt)
        });
}
