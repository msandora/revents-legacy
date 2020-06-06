import { combineReducers } from "redux";
import { reducer as FormReducer } from 'redux-form';
import testReducer from "../../features/playground/testReducer";
import eventReducer from "../../features/events/eventReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer
});

export default rootReducer;
