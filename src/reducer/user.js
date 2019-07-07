import { updateName, updateEmail } from '../action';
import produce from 'immer';

const user = (state = { name: '', email: '' }, payload) => {
    switch (payload.type) {
        case updateName.type:
            // return Object.assign({}, state, { name: payload.name });
            return produce(state, draft => {
                draft.name = payload.name;
            })
        case updateEmail.type:
            // return Object.assign({}, state, { email: payload.email });
            return produce(state, draft => {
                draft.email = payload.email;
            })
        default: return state;
    }
};

export default user;