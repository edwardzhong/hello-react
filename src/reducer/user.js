import { updateName, updateEmail } from '../action';
import produce from 'immer';

const user = (state = { name: '', email: '' }, payload) => produce(state, draft => {
    switch (payload.type) {
        case updateName.type: draft.name = payload.name;break;
        case updateEmail.type: draft.email = payload.email;break;
    }
});

export default user;