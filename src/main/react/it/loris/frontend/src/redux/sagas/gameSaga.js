import { put, takeEvery } from 'redux-saga/effects';
import { wrappedChessReq } from "../../api/notChessRequests";

function* fetchGames(payload) {
    const games = yield wrappedChessReq({method: 'get', url: '/game', ...payload});
    yield put({type: "FETCH_GAMES", payload: games.data});
}

function* fetchGame(payload) {
    const game = yield wrappedChessReq({method: 'get', url: `/game/${payload}`});
    yield put({type: "FETCH_GAME", payload: game.data});
}

function* gameSaga() {
    yield takeEvery('FETCH_GAMES_REQUEST', fetchGames);
    yield takeEvery('FETCH_GAME_REQUEST', fetchGame);
}

export default gameSaga;