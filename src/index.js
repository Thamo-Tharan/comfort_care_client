import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { storingOrderInfo } from "./Reducers/storingOrderinfo";
import { storingWhistlistInfo } from "./Reducers/storingWishlist";
const combineReducer = combineReducers({
  userOrderInfo: storingOrderInfo,
  userWhistlistInfo: storingWhistlistInfo,
});
const store = createStore(combineReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
