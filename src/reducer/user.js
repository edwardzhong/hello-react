import { updateName, updateEmail } from '../action';

const user = (state = { name: '', email: '' }, payload) => {
    switch (payload.type) {
        case updateName.type:
            return Object.assign({}, state, { name: payload.name });
        case updateEmail.type:
            return Object.assign({}, state, { email: payload.email });
        default: return state;
    }
};

export default user;