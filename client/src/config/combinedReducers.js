// Redux
import { combineReducers } from "redux";
// Reducers
import Curriculums from "./../screens/Home/Home.ducks";

export default combineReducers({
    curriculums: Curriculums
});
