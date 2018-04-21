import { all } from 'redux-saga/effects';
import { wallet } from 'ducks/wallet';

export default function*() {
  yield all([wallet()]);
}
