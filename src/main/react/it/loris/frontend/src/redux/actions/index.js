export const login = credentials => {
    return {
        type: 'LOGIN_REQUEST',
        payload: credentials
    };
};

export const logout = () => {
    localStorage.removeItem("refresh_token");
    return {
        type: 'LOGOUT'
    };
};

export const refresh = (lastFailedAction) => {
    return {
        type: 'LOG_BACK_IN_REQUEST',
        lastFailedAction: lastFailedAction
    };
};

export const fetchUser = (userId) => {
    return {
        type: 'FETCH_USER_REQUEST',
        payload: userId
    };
};

export const fetchCurrentUser = () => {
    return {
        type: 'FETCH_CURRENT_USER_REQUEST'
    };
};

export const fetchUsers = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    };
};

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
