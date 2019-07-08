import { addComment, removeComment } from '../action';
import produce from 'immer';

const list = (state = [], payload) => produce(state, draft => {
    switch (payload.type) {
        case addComment.type:
            if (Array.isArray(payload.comment)) {
                draft.concat(payload.comment);
            } else {
                draft.push(payload.comment);
            }
        case removeComment.type:
            const index = draft.findIndex(obj => obj.id == payload.id);
            if(index >= 0){
                draft.splice(index, 1);
            }
    }
});

export default list;