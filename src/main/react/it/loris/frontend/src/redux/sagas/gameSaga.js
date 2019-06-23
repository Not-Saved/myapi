import { put, takeEvery } from 'redux-saga/effects';
import { wrappedChessReq } from "../../api/notChessRequests";

function* fetchGames(action) {
    const games = yield wrappedChessReq({method: 'get', url: '/game', ...action.payload}, action);
    yield put({type: "FETCH_GAMES", payload: games.data});
}

function* fetchGame(action) {
    try{
        const game = yield wrappedChessReq({method: 'get', url: `/game/${action.payload} `}, action);
        yield put({type: "FETCH_GAME", payload: game.data});
    } catch (e) {
        console.log(e)
    }

}

function* gameSaga() {
    yield takeEvery('FETCH_GAMES_REQUEST', fetchGames);
    yield takeEvery('FETCH_GAME_REQUEST', fetchGame);
}

export default gameSaga;