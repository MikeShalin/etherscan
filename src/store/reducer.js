import { combineReducers } from 'redux';
import walletReducer, { moduleName as walletModule } from 'ducks/wallet';

export default combineReducers({
  [walletModule]: walletReducer,
});
