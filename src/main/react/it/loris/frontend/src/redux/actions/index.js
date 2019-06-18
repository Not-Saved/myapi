export const login = credentials => {
    return {
        type: 'LOGIN_REQUEST',
        payload: credentials
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
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
    }
}

export const fetchGame = (payload) => {
    return {
        type: 'FETCH_GAME_REQUEST',
        payload: payload
    }
}
