import { call, put, take } from 'redux-saga/effects';
import { notChessReq } from "../../api/notChessRequests";

function* fetchGames(payload) {
    const games = yield call(notChessReq().get, '/game', {params: payload});
    yield put({type: "FETCH_GAMES", payload: games.data});
}

function* fetchGame(payload) {
    const game = yield call(notChessReq().get, `/game/${payload}`);
    yield put({type: "FETCH_GAME", payload: game.data});
}

function selectRightRequest(type) {
    switch (type) {
        case "FETCH_GAMES_REQUEST":
            return fetchGames;
        case "FETCH_GAME_REQUEST":
            return fetchGame;
        default:
            throw new Error("You fucked up types somewhere");
    }
}

function* gameSaga() {
    while (true) {
        try {
            const {payload, type} = yield take(action => /.*GAME[S]?_REQUEST.*/.test(action.type));
            yield call(selectRightRequest(type), payload);
        } catch (e) {
            if (e.response && e.response.status === 401) {
                yield put({type: "LOGOUT"});
            }
        }
    }
}

export default gameSaga;