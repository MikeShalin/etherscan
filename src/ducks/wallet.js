import { Record, OrderedMap } from 'immutable';
import 'regenerator-runtime/runtime';
import { createActions } from 'redux-actions';
import { call, put, all, takeEvery } from 'redux-saga/effects';
import { getWallet } from 'api/etherscan/etherscan';
import { createSelector } from 'reselect';
/**
 * Constants
 * */
export const moduleName = 'wallet';
const prefix = moduleName;

export const REQUEST_WALLET = `${prefix}/REQUEST_WALLET`;
export const NOT_VALID_WALLET = `${prefix}/NOT_VALID_WALLET`;
export const FETCH_WALLET = `${prefix}/FETCH_WALLET`;
export const FAILURE_WALLET = `${prefix}/FAILURE_WALLET`;

/**
 * Reducer
 * */
export const Wallet = Record({
  address: null,
  status: null,
  result: null,
  error: null,
  fetching: null,
});

export default function walletReducer(state = new Wallet(), action) {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_WALLET:
      return state
        .set('address', payload)
        .set('status', 'pending')
        .set('fetching', true);
    case FETCH_WALLET:
      return state
        .set('status', payload.status)
        .set('error', false)
        .set('result', `Кошелек валидный: ${payload.result}`)
        .set('fetching', false);
    case NOT_VALID_WALLET:
      return state
        .set('status', payload.status)
        .set('error', true)
        .set('result', payload.result)
        .set('fetching', false);
    case FAILURE_WALLET:
      return state
        .set('status', payload.status)
        .set('error', true)
        .set('result', payload.result)
        .set('fetching', false);
    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const addressSelector = createSelector(
  stateSelector,
  state => state.address
);
export const statusSelector = createSelector(
  stateSelector,
  state => state.status
);
export const resultSelector = createSelector(
  stateSelector,
  state => state.result
);
export const errorSelector = createSelector(
  stateSelector,
  state => state.error
);
export const fetchingSelector = createSelector(
  stateSelector,
  state => state.fetching
);

/**
 * Action Creators
 * */

export const walletActions = createActions({
  wallet: {
    REQUEST_WALLET: address => address,
    FETCH_WALLET: walletStatus => walletStatus,
    NOT_VALID_WALLET: walletStatus => walletStatus,
    FAILURE_WALLET: walletStatus => walletStatus,
  },
});

/**
 * Sagas
 **/

export function* requestWalletSaga(action) {
  const { address } = action.payload,
    { fetchWallet, notValidWallet, failureWallet } = walletActions.wallet,
    wallet = yield call(getWallet, address);

  if (wallet.status === '1') yield put(fetchWallet(wallet));
  if (wallet.status === '0') yield put(notValidWallet(wallet));
  if (!wallet.status) yield put(failureWallet(wallet));
}

export const wallet = function*() {
  yield takeEvery(REQUEST_WALLET, requestWalletSaga);
};
