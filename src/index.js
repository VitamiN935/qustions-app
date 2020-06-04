import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reduxThunk from 'redux-thunk'
import createSagaMiddleWare from 'redux-saga'
import rootReducer from "./store/Reducers/rootReducer";
import {sagaWatcher} from "./store/saga/watcher";
import {filterMiddleWear} from "./store/middlewear/filterMiddleWear";
import {textAlertMiddleWear} from "./store/middlewear/textAlertMiddleWear";


const saga = createSagaMiddleWare()
const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  reduxThunk, saga, filterMiddleWear, textAlertMiddleWear
)))

saga.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
