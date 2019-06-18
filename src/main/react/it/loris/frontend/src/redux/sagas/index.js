import { all } from 'redux-saga/effects';
import userSaga from "./userSaga";
import authSaga from "./authSaga";
import gameSaga from "./gameSaga";

function* sagas() {
    yield all([
        authSaga(),
        gameSaga(),
        userSaga()
    ]);
}

export default sagas;
