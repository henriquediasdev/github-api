import {combineReducers} from 'redux';
import app from './app';

const reducer = combineReducers({
  app,
});

const reducerWithResetHandler = (state, action) => {
  let handledState = state;
  if (action.type === 'RESET_STATE') {
    handledState = undefined;
  }
  return reducer(handledState, action);
};

export default reducerWithResetHandler;
