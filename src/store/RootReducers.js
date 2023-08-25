import { combineReducers } from "redux";
import ThemeCustomReducer from "./ThemeCustom/ThemeCustomReducer";
import Authentication from "./Authentication/Authentication";

const RootReducers = combineReducers({
  ThemeCustomReducer,
  Authentication,
});

export default RootReducers;
