import produce from 'immer'
import { Store, Action, Reducer } from 'types/context'

/**
 * generate Redux action
 * @param {String} typeName
 * @param {String} argName
 */
const createAction = (typeName: string, argName: string): Function => {
	typeName = typeName || "TYPE_ID_" + new Date().getTime() + Math.ceil(Math.random() * 100000000);
	let payload = { type: typeName };
	if (argName) payload[argName] = null;
	let fn = (arg:any) => {
		if (arg) {
			if (argName) payload[argName] = arg;
			else if (typeof arg == "object") Object.assign(payload, arg);
			else payload[0] = arg;
		}
		// console.log(payload); // develop log
		return payload;
	};
	// fn.type = typeName;
	fn.toString = () => typeName;
	return fn;
};

/**
 * combine reducers Object
 * @param {Object} reducers
 */
const combineReducers = (reducers: object): object => {
	return (state:object = {}, action: object) => {
		return Object.keys(reducers).reduce((nextState, key) => {
			nextState[key] = reducers[key](state[key], action);
			return nextState;
		}, {});
	};
};

/**
 * combine stores
 * @param obj 
 */
const combineStore = (obj: object): Store => {
	const store = {
		states: {},
		actions: {},
		asyncs: {}
	};
	for (let values of Object.values(obj)) {
		Object.assign(store.states, values.states || {});
		Object.assign(store.actions, values.actions || {});
		Object.assign(store.asyncs, values.asyncs || {});
	}
	return store;
};

/**
 * create reducer
 * @param store 
 * @param dispatch 
 */
const createReducer = (store: Store, dispatch: Function): Reducer => {
	const { actions, asyncs } = store;
	return (state = {}, action: Action) => produce(state, draft => {
		const { type, arg } = action;
		console.log(type, arg); // develop log
		if (actions[type]) actions[type](draft, arg);
		if (asyncs[type])
			asyncs[type]((type: string, arg: any) => dispatch({ type, arg }), arg);
	});
};

/**
 * bind dispatch to action
 * @param {Object} actions
 * @param {Function} dispatch
 */
const bindActions = (store: Store, dispatch: Function): object => {
	const { actions, asyncs } = store;
	return Object.keys({ ...actions, ...asyncs }).reduce((next, key) => {
		next[key] = (arg: any) => dispatch({ type: key, arg });
		return next;
	}, {});
};

export {
	createAction,
	combineReducers,
	combineStore,
	createReducer,
	bindActions
}