/**
 * generate Redux action
 * @param {String} typeName 
 * @param {String} argName 
 */
const createAction = (typeName, argName) => {
    typeName = typeName || 'TYPE_ID_' + new Date().getTime() + Math.ceil(Math.random() * 100000000);
    let payload = { type: typeName };
    if (argName) payload[argName] = null;
    let fn = (arg) => {
        if (arg) {
            if (argName) payload[argName] = arg;
            else payload[0] = arg;
        }
        return payload;
    };
    fn.type = typeName;
    return fn;
};

export const addComment = createAction('ADD_COMMENT', 'comment');
export const removeComment = createAction('REMOVE_COMMENT', 'id');
export const updateName = createAction('UPDATE_NAME', 'name');
export const updateEmail = createAction('UPDATE_EMAIL', 'email');