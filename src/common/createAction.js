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

export default createAction