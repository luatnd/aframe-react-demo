import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {MyScene} from './AFrame/MyScene'
import {InteractionUI} from './VR_InteractionUI/InteractionUI'

class App extends React.Component {
  render() {
    return (
      <div style={{width:"100%", height: "100%"}}>
        <MyScene/>
        <InteractionUI/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#appContainer'));
