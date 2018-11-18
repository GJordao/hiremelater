// Redux
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// Reducers
import reducers from "./combinedReducers";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
