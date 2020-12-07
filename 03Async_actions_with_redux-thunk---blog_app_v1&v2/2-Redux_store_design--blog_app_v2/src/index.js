//Dependencies--- npm install --save redux react-redux axios redux-thunk
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk)); //when we apply middleware of redux-thunk anytime we dispatch an action, action is first sent to redux thunk as the middleware and after thunk it will sent to all our reducers

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
