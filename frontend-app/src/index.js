import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { ConfigStore } from './configureStore'

console.log(ConfigStore)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ConfigStore.store}>
      <PersistGate loading={null} persistor={ConfigStore.persistor} >
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
 ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
