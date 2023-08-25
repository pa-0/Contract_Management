import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import RootReducers from "./RootReducers";


const makeStore = () => {
    return createStore(RootReducers, compose(applyMiddleware(thunk)));
  };
  
  export default createWrapper(makeStore, { debug: true });