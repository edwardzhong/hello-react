/**
 * bind dispatch to action
 * @param {Object} actions 
 * @param {Function} dispatch 
 */
const bindActions = (actions, dispatch) => {
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

export default bindActions