import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {MyScene} from './AFrame/MyScene'

class App extends React.Component {
  render() {
    return (
      <MyScene debug/>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
