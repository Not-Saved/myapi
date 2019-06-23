export const fetchUsers = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
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
