import { call, put, take, takeEvery, fork, cancel } from 'redux-saga/effects';
import { accessToken, refreshToken } from "../../api/notChessRequests";

function* authorize(credentials) {
    try {
        const token = yield call(accessToken, credentials);
        yield put({ type: 'LOGIN_SUCCESS', payload: token.data });
        yield localStorage.setItem("refresh_token", token.data.refresh_token);
        yield put({ type: 'FETCH_CURRENT_USER_REQUEST' });
    } catch (error) {
        yield put({ type: 'LOGIN_ERROR' });
    }
}

function* refresh(action) {
    try {
        const token = yield call(refreshToken);
        yield put({ type: 'LOGIN_SUCCESS', payload: token.data });
        yield put({ type: 'FETCH_CURRENT_USER_REQUEST' });
        if (action.lastFailedAction) {
            yield put(action.lastFailedAction);
        }
    } catch (e) {
        yield put({ type: 'LOGOUT' });
    }
}

function* authSaga() {
    yield takeEvery("LOG_BACK_IN_REQUEST", refresh);
    while (true) {
        const { payload } = yield take('LOGIN_REQUEST');
        const task = yield fork(authorize, payload);
        const action = yield take([ 'LOGOUT', 'LOGIN_ERROR' ]);
        if (action.type === 'LOGOUT') {
            yield cancel(task);
        }
    }
}

export default authSaga;