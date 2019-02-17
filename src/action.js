import createAction from './common/createAction'

export const addComment = createAction('ADD_COMMENT', 'comment');
export const removeComment = createAction('REMOVE_COMMENT', 'id');
export const updateName = createAction('UPDATE_NAME');
export const updateEmail = createAction('UPDATE_EMAIL');