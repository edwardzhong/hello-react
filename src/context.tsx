import React, { createContext, useReducer, useContext } from "react";
import { createReducer, bindActions } from "./common/store";
import store from "./store";

let dispatch: Function;
const states = store.state;
const rootReducer = createReducer(store, dispatch);
const Context = createContext(null);

export const getContext = () => useContext(Context);
export const Provider = (props: JSX.IntrinsicAttributes & React.ProviderProps<any>) => {
	const [state, commit] = useReducer(rootReducer, states);
	const action = bindActions(store, commit);
	dispatch = commit;
	console.log(state); // develop log
	return <Context.Provider { ...props } value={ { state, action } } />;
};

export default Context;
