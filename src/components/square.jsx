import React from 'react';
import ReactDOM from 'react-dom';
import 'Css/style.scss';

class Square extends React.Component {
        constructor() {
                super();
                this.state = {
                        value: "btn"
                };
        }

        render() {
                return (<div>
                        <div className='img1'></div>
                        <div className='img2'></div>
                        <button className="square" onClick={() => this.setState({value: 'X'})}>
                                {this.state.value}
                        </button>
                </div>);
        }
}

export default Square;
