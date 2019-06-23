export const fetchGames = (payload) => {
    return {
        type: 'FETCH_GAMES_REQUEST',
        payload: payload
    };
};

export const fetchGame = (payload) => {
    return {
        type: 'FETCH_GAME_REQUEST',
        payload: payload
    };
};
