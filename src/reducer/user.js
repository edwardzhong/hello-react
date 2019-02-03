import { UPDATE_NAME, UPDATE_EMAIL } from '../constants.js'

const user = (state = { name: '', email: '' }, payload) => {
    switch (payload.type) {
        case UPDATE_NAME:
            return Object.assign({}, state, { name: payload.name });
        case UPDATE_EMAIL:
            return Object.assign({}, state, { email: payload.email });
        default: return state;
    }
};

export default user;