import { put, takeEvery } from 'redux-saga/effects';
import { wrappedChessReq } from "../../api/notChessRequests";

function* fetchUsers() {
    const users = yield wrappedChessReq({method: 'get', url: '/user'});
    yield put({type: "FETCH_USERS", payload: users.data});
}

function* fetchUser(payload) {
    const user = yield wrappedChessReq({method: 'get', url: `/user/${payload}`});
    yield put({type: "FETCH_USER", payload: user.data});
}

function* fetchCurrentUser() {
    const currentUser = yield wrappedChessReq({method: 'get', url: '/user/me'});
    yield put({type: "FETCH_CURRENT_USER", payload: currentUser.data});
}

function* userSaga() {
    yield takeEvery('FETCH_USERS_REQUEST', fetchUsers);
    yield takeEvery('FETCH_USER_REQUEST', fetchUser);
    yield takeEvery('FETCH_CURRENT_USER_REQUEST', fetchCurrentUser);
}

export default userSaga;