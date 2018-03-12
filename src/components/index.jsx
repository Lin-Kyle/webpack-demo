import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import MyLoadingComponent from 'Component/LoadingComponent.jsx';

const LoadableSquareComponent = Loadable({
        loader: () => import ('Component/square.jsx'),
        loading: MyLoadingComponent,
        delay: 300
})

class App extends React.Component {
        render() {
                return <LoadableSquareComponent/>
        }  
}

export default App;
