import React, { createContext, useReducer, useContext } from "react";
import produce from "immer";
import { states, actions, asyncs } from "./store";

let setState = null;
const createReducers = state => {
	return (state = {}, payload) => produce(state, draft => {
		const { name, arg } = payload;
		console.log(name, arg);// develop log
		if(actions[name]){
			actions[name](draft, arg);
		} else {
			asyncs[name]((name, arg) => setState({name,arg}), arg);
		}
	});
};

const bindActions = (actions, dispatch) => {
	return Object.keys({...actions,...asyncs}).reduce((next, key) => {
		next[key] = arg => dispatch({ name: key, arg });
		return next;
	}, {});
};

const rootReducer = createReducers(states);
const Context = createContext(null);
export const getContext = () => useContext(Context);
export const Provider = props => {
	const [state, dispatch] = useReducer(rootReducer, states);
	const action = bindActions(actions, dispatch);
	setState = dispatch;
	console.log(state);// develop log
	return <Context.Provider {...props} value={{ state, action, dispatch }} />;
};

export default Context