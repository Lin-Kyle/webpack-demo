import React from 'react';
import ReactDOM from 'react-dom';
import 'Css/style.css';

class Square extends React.Component {
        constructor() {
                super();
                this.state = {
                        value: 1234567890
                };
        } 

        render() {
                return (<button className="square" onClick={() => this.setState({value: 'X'})}>
                        {this.state.value}
                </button>);
        }
}

export default Square;
