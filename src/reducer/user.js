import { updateName, updateEmail } from '../action';
import produce from 'immer';

const user = (state = { name: '', email: '' }, payload) => produce(state, draft => {
    switch (payload.type) {
        case updateName.type: draft.name = payload.name;
        case updateEmail.type: draft.email = payload.email;
    }
});

export default user;