import { createStore, applyMiddleware } from 'redux';
// solo implementa sin los middlewate
// import { devToolsEnhancer } from 'redux-devtools-extension';

// solo se usa cuando se implementa un middleware en este caso es thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

export const configureStore = () => {
  // return createStore(rootReducer);
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;
