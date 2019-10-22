import createAction from './common/createAction'

export const loginAdd =createAction('LOGIN_ADD')
export const loginClear =createAction('LOGIN_CLEAR')
export const selfAdd = createAction('SELF_ADD')
export const selfClear = createAction('SELF_CLEAR')

export const addComment = createAction('ADD_COMMENT', 'comment');
export const removeComment = createAction('REMOVE_COMMENT', 'id');
export const updateName = createAction('UPDATE_NAME');
export const updateEmail = createAction('UPDATE_EMAIL');