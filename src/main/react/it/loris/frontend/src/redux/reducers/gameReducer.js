import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_GAMES':
            return { ..._.mapKeys(action.payload, 'id') };
        case 'FETCH_GAME':
            return {[action.payload.id]: action.payload };
        default:
            return state;
    }
};