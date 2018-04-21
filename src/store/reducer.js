import { combineReducers } from 'redux';
import walletReducer, { moduleName as userModule } from 'ducks/wallet';

export default combineReducers({
  [userModule]: walletReducer,
});
