import { put, takeEvery } from 'redux-saga/effects';
import { wrappedChessReq } from "../../api/notChessRequests";

function* fetchUsers(action) {
    const users = yield wrappedChessReq({method: 'get', url: '/user'}, action);
    yield put({type: "FETCH_USERS", payload: users.data});
}

function* fetchUser(action) {
    const user = yield wrappedChessReq({method: 'get', url: `/user/${action.payload}`}, action);
    yield put({type: "FETCH_USER", payload: user.data});
}

function* fetchCurrentUser(action) {
    const currentUser = yield wrappedChessReq({method: 'get', url: '/user/me'}, action);
    yield put({type: "FETCH_CURRENT_USER", payload: currentUser.data});
}

function* userSaga() {
    yield takeEvery('FETCH_USERS_REQUEST', fetchUsers);
    yield takeEvery('FETCH_USER_REQUEST', fetchUser);
    yield takeEvery('FETCH_CURRENT_USER_REQUEST', fetchCurrentUser);
}

export default userSaga;