import { all } from 'redux-saga/effects';
import unitsSaga from './unitsSaga';

export default function* rootSaga() {
  yield all([
    unitsSaga(),
  ]);
}