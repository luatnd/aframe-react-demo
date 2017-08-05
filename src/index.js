import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//import 'react-hot-loader/patch';
//import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from './App';
import { store, rehydrationPromise } from './base/redux/configureStore';


rehydrationPromise.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      {/*<SocketWrapper>*/}
      <App/>
      {/*</SocketWrapper>*/}
    </Provider>
    , document.querySelector('#appContainer')
  )
});
