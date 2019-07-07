import { updateName, updateEmail } from '../action';
import produce from 'immer';

const user = (state = { name: '', email: '' }, payload) => produce(state, draft => {
    switch (payload.type) {
        case updateName.type:
            // return Object.assign({}, state, { name: payload.name });
            draft.name = payload.name;
        case updateEmail.type:
            // return Object.assign({}, state, { email: payload.email });
            draft.email = payload.email;
    }
});

export default user;