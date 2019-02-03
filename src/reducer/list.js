import { ADD_COMMENT, REMOVE_COMMENT } from '../constants.js'

const list = (state = [], payload) => {
    switch (payload.type) {
        case ADD_COMMENT:
            if (Array.isArray(payload.comment)) {
                return [...state, ...payload.comment];
            } else {
                return [...state, payload.comment];
            }
        case REMOVE_COMMENT:
            return state.filter(i => i.id != payload.id);
        default: return state;
    }
};

export default list