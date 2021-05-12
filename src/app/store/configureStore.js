import { createStore, applyMiddleware } from 'redux';
// solo implementa sin los middlewate
// import { devToolsEnhancer } from 'redux-devtools-extension';

// solo se usa cuando se implementa un middleware en este caso es thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { verifyAuth } from '../../features/auth/authActions';

export const configureStore = () => {
  // return createStore(rootReducer);
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  store.dispatch(verifyAuth());
  return store;
};

export default configureStore;
