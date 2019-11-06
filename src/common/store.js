import produce from "immer";

/**
 * generate Redux action
 * @param {String} typeName
 * @param {String} argName
 */
export const createAction = (typeName, argName) => {
	typeName = typeName || "TYPE_ID_" + new Date().getTime() + Math.ceil(Math.random() * 100000000);
	let payload = { type: typeName };
	if (argName) payload[argName] = null;
	let fn = arg => {
		if (arg) {
			if (argName) payload[argName] = arg;
			else if (typeof arg == "object") Object.assign(payload, arg);
			else payload[0] = arg;
		}
		// console.log(payload); // develop log
		return payload;
	};
	fn.type = typeName;
	fn.toString = () => typeName;
	return fn;
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

export const combineStore = objs => {
	return Object.keys(objs).reduce((p, n, i) => {
		let prev = objs[p],
			next = objs[n];
		let ps = prev.states || {},
			pa = prev.actions || {},
			py = prev.asyncs || {};
		let ns = next.states,
			na = next.actions || {},
			ny = next.asyncs || {};
		return {
			states: { ...ps, ...ns },
			actions: { ...pa, ...na },
			asyncs: { ...py, ...ny }
		};
	});
};

export const createReducers = (store, dispatch) => {
	const { actions, asyncs } = store;
	return (state = {}, payload) =>
		produce(state, draft => {
			const { name, arg } = payload;
			console.log(name, arg); // develop log
			if (actions[name]) actions[name](draft, arg);
			if (asyncs[name])
				asyncs[name]((name, arg) => dispatch({ name, arg }), arg);
		});
};

/**
 * bind dispatch to action
 * @param {Object} actions
 * @param {Function} dispatch
 */
export const bindActions = (store, dispatch) => {
	const { actions, asyncs } = store;
	return Object.keys({ ...actions, ...asyncs }).reduce((next, key) => {
		next[key] = arg => dispatch({ name: key, arg });
		return next;
	}, {});
};
