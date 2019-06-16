import { call, put, all, take, fork, cancel, cancelled } from 'redux-saga/effects'
import { accessToken } from '../../api/notChessRequests'

function* authorize(credentials) {
	try {
		const token = yield call(accessToken, credentials)
		yield put({ type: 'LOGIN_SUCCESS', payload: token.data })
	} catch (error) {
		yield put({ type: 'LOGIN_ERROR' })
	} finally {
		if (yield cancelled()) {

		}
	}
}

function* loginFlow() {
	while (true) {
		const { payload } = yield take('LOGIN_REQUEST')
		const task = yield fork(authorize, payload)
		const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
		if (action.type === 'LOGOUT') {
			yield cancel(task)
		}
	}
}

function* sagas() {
	yield all([
		loginFlow()
	])
}

export default sagas;
