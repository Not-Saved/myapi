const INITIAL_VALUE = {
    isPending: false,
    isFailed: false,
    isSignedIn: false,
    tokenObject: null
};

export default (state = INITIAL_VALUE, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {...state, isPending: true};
        case 'LOGIN_SUCCESS':
            return {...state, isPending: false, isSignedIn: true, tokenObject: action.payload};
        case 'LOGIN_ERROR':
            return {...state, isPending: false, isFailed: true, isSignedIn: false, tokenObject: null};
        case 'LOGOUT':
            return {INITIAL_VALUE};
        default:
            return state;
    }
};