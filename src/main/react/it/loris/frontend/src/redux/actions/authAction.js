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