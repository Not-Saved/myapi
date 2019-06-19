import { call, put, take, fork, cancel } from 'redux-saga/effects';
import { accessToken } from "../../api/notChessRequests";

function* authorize(credentials) {
    try {
        const token = yield call(accessToken, credentials);
        yield put({type: 'LOGIN_SUCCESS', payload: token.data});
        yield put({type: 'FETCH_CURRENT_USER_REQUEST'});
    } catch (error) {
        yield put({type: 'LOGIN_ERROR'});
    }
}

function* authSaga() {
    while (true) {
        const {payload} = yield take('LOGIN_REQUEST');
        const task = yield fork(authorize, payload);
        const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
        if (action.type === 'LOGOUT') {
            yield cancel(task);
        }
    }
}

export default authSaga;