import {
  wallet,
  requestWalletSaga,
  moduleName,
  walletActions,
} from 'ducks/wallet';
import { call, put, all, takeEvery } from 'redux-saga/effects';
import { getWallet } from 'api/etherscan/etherscan';

const action = {},
  walletIsValid = {
    status: '1',
    message: 'OK',
    result: '670456215218885498951364',
  },
  walletIsNotValid = {
    status: '0',
    message: 'NOTOK',
    result: 'Error! Invalid address format',
  },
  networkError = {
    status: false,
    result: new Error().toString(),
  },
  { fetchWallet, notValidWallet, failureWallet } = walletActions.wallet;
let saga = wallet(action);

action.payload = walletIsValid;
action.type = `${moduleName}/REQUEST_WALLET`;

describe('Сценарий кода когда нет ошибок', () => {
  it('1. Эффект takeEvery(wallet/REQUEST_WALLET, requestWalletSaga)', () => {
    expect(saga.next().value).toEqual(
      takeEvery(action.type, requestWalletSaga)
    );
  });
  it('2. Эффект call(getWallet, undefined)', () => {
    saga = requestWalletSaga(action);
    expect(saga.next().value).toEqual(call(getWallet, undefined));
  });
  it('3. Эффект put wallet/FETCH_WALLET', () => {
    action.type = `${moduleName}/FETCH_WALLET`;
    expect(saga.next(walletIsValid).value).toEqual(
      put(fetchWallet(walletIsValid))
    );
  });
});
describe('Сценарий кода когда произошла ошибка', () => {
  it('4. Ошибка невалидный адрес кошелька (wallet/NOT_VALID_WALLET)', () => {
    action.payload = walletIsValid;
    action.type = `${moduleName}/REQUEST_WALLET`;

    saga = requestWalletSaga(action);
    saga.next();

    action.type = `${moduleName}/NOT_VALID_WALLET`;
    action.payload = walletIsNotValid;
    expect(saga.next(walletIsNotValid).value).toEqual(
      put(notValidWallet(walletIsNotValid))
    );
  });
  it('5. Ошибка запроса', () => {
    action.payload = walletIsValid;
    action.type = `${moduleName}/REQUEST_WALLET`;

    saga = requestWalletSaga(action);
    saga.next();

    action.type = `${moduleName}/FAILURE_WALLET`;
    action.payload = networkError;
    expect(saga.next(networkError).value).toEqual(
      put(failureWallet(networkError))
    );
  });
});
