/**
 * generate Redux action
 * @param {String} typeName 
 * @param {String} argName 
 */
export const createAction = (typeName, argName) => {
    typeName = typeName || 'TYPE_ID_' + new Date().getTime() + Math.ceil(Math.random() * 100000000);
    let payload = { type: typeName };
    if (argName) payload[argName] = null;
    let fn = (arg) => {
        if (arg) {
            if (argName) payload[argName] = arg;
            else if (typeof arg == 'object') Object.assign(payload, arg);
            else payload[0] = arg;
        }
        console.log(payload);
        return payload;
    };
    fn.type = typeName;
    fn.toString = () => typeName;
    return fn;
};

/**
 * bind dispatch to action
 * @param {Object} actions 
 * @param {Function} dispatch 
 */
export const bindActions = (actions, dispatch) => {
    if (typeof actions === 'function') {
        return (args) => dispatch(actions(args));
    }
    return Object.keys(actions).reduce((next, key) => {
        // next[key] = function () {
        //     return dispatch(actions[key].apply(this,arguments));
        // }
        next[key] = (args) => dispatch(actions[key](args));
        return next;
    }, {});
};



/**
 * combine reducers Object
 * @param {Object} reducers 
 */
export const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {});
    };
};

