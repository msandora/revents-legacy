import { combineReducers } from "redux";
import testReducer from "../../features/playground/testReducer";

const rootReducer = combineReducers({
  test: testReducer
})

export default rootReducer;