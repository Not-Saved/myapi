import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            return {...state, otherUsers: {..._.mapKeys(action.payload, 'id')}};
        case 'FETCH_USER':
            return {...state, otherUsers: {[action.payload.id]: action.payload}};
        case 'FETCH_CURRENT_USER':
            return {...state, currentUser: action.payload};
        default:
            return state;
    }
};