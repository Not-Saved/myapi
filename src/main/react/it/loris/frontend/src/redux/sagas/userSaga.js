import { call, put, take } from 'redux-saga/effects';
import { notChessReq } from "../../api/notChessRequests";

function* fetchUsers() {
    const users = yield call(notChessReq().get, '/user');
    yield put({type: "FETCH_USERS", payload: users.data});
}

function* fetchUser(payload) {
    const user = yield call(notChessReq().get, `/user/${payload}`);
    yield put({type: "FETCH_USER", payload: user.data});
}

function* fetchCurrentUser() {
    const currentUser = yield call(notChessReq().get, '/user/me');
    yield put({type: "FETCH_CURRENT_USER", payload: currentUser.data});
}

function selectRightRequest(type) {
    switch (type) {
        case "FETCH_USERS_REQUEST":
            return fetchUsers;
        case "FETCH_USER_REQUEST":
            return fetchUser;
        case 'FETCH_CURRENT_USER_REQUEST':
            return fetchCurrentUser;
        default:
            throw new Error("You fucked up types somewhere");
    }
}

function* userSaga() {
    while (true) {
        try {
            const {payload, type} = yield take(action => /.*USER[S]?_REQUEST.*/.test(action.type));
            yield call(selectRightRequest(type), payload);
        } catch (e) {
            if (e.response && e.response.status === 401) {
                yield put({type: "LOGOUT"});
            }
        }
    }
}

export default userSaga;