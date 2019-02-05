import { addComment, removeComment } from '../action';

const list = (state = [], payload) => {
    switch (payload.type) {
        case addComment.type:
            if (Array.isArray(payload.comment)) {
                return [...state, ...payload.comment];
            } else {
                return [...state, payload.comment];
            }
        case removeComment.type:
            return state.filter(i => i.id != payload.id);
        default: return state;
    }
};

export default list;