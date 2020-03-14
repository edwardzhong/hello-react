type PlainObject = { [P: string]: any };
type Command = { type: string; arg?: any }
type Dispatch = (param: Command) => void;
type Action<S> = (state: S, payload?: any) => void;
type Async = (dispatch: (type: string, arg?: any) => void, payload?: any) => any;
interface Reducer {
  (state: PlainObject, action: Command): PlainObject;
}
type ActionTree<S, A> = {
  [P in keyof A]: Action<S>;
}
interface AsyncsTree {
  [key: string]: Async;
}
interface Store<S, A> {
  state?: S | (() => S);
  actions?: ActionTree<S, A>;
  asyncs?: AsyncsTree;
}

type LoginInfo = {
  token: string;
}

type UserInfo = {
  id?: string;
  name?: string;
  email?: string;
}

type PItem = { 
  id: string,
  txt: string 
};

interface BaseState {
  loginInfo: LoginInfo;
  user: UserInfo;
}

interface ListState {
  list: Array<PItem>;
}

interface State extends ListState, BaseState { }

interface BaseAction {
  setLogin(payload: any): void;
  clearLogin(): void;
  setUser(payload: any): void;
  clearUser(): void;
}

interface ListAction {
  addComment(payload: Array<PItem> | PItem): void;
  removeComment(id: string): void;
}

interface Actions extends BaseAction, ListAction { }

interface ResData<T> {
  code: number;
  msg?: string;
  data?: T;
}

type AxiosFn = (url: string, param?: any) => Promise<ResData<any>>;

export {
  PlainObject,
  AxiosFn,
  ActionTree,
  AsyncsTree,
  Store,
  State,
  Actions,
  Command,
  Reducer,
  Dispatch,
  BaseState,
  BaseAction,
  PItem,
  ListState,
  ListAction,
  ResData,
}