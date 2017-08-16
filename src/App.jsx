import 'babel-polyfill';
import React from 'react';
import {MyScene} from './AFrame/MyScene'
import {InteractionUI} from './VR_InteractionUI/InteractionUI'
import {HtmlShader} from './VR_InteractionUI/HtmlShader/HtmlShader'

export default class App extends React.Component {
  render() {
    return (
      <div style={{width:"100%", height: "100%"}}>
        <MyScene/>
        <InteractionUI/>
        <HtmlShader/>
      </div>
    );
  }
}
