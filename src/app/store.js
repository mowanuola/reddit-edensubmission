import { createStore } from "redux";
import postReducer from "./reducers";

const store = createStore(postReducer);
export default store;
