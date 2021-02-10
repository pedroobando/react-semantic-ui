import { createStore } from 'redux';
import { testReducer } from '../../features/sandox/testRedux';

export const configureStore = () => {
  return createStore(
    testReducer /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

// export default configureStore;
