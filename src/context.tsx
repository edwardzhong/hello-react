import React, { createContext, useReducer, useContext, useMemo } from 'react';
import { createReducer, bindActions } from './common/store';
import store from './store';
import { ListState, PlainObject, Dispatch } from 'type';

let dispatch: Dispatch;
const states = store.state;
const rootReducer = createReducer(store, dispatch);
const Context = createContext(null);

export const GetContext: () => { state: ListState, action: PlainObject } = () => useContext(Context);
export const Provider = (props: JSX.IntrinsicAttributes & React.ProviderProps<any>) => {
  const [state, commit] = useReducer(rootReducer, states);
  const action = bindActions(store, commit);
  dispatch = commit;
  console.log(state); // develop log
  return useMemo(() => (<Context.Provider { ...props } value={ { state, action } } />), [state, dispatch])
};

export default Context;