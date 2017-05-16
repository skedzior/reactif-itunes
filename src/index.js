import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './js/components/Layout';
import store from "./store"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact={true} path="/" component={Layout}/>
      </App>
    </Router>
  </Provider>, document.getElementById('root')
);
