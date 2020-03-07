type PlainObject = { [P: string]: any };
type Command = { type: string; arg?: any }
type Dispatch = (param: Command) => void;
type Action<S> = (state: S, payload?: any) => void;
type Async = (dispatch: (type: string, arg?: any) => void, payload?: any) => any;
interface Reducer {
  (state: PlainObject, action: Command): PlainObject;
}
interface ActionTree<S> {
  [key: string]: Action<S>;
}
interface AsyncsTree {
  [key: string]: Async;
}
interface Store<S> {
  state?: S | (() => S);
  actions?: ActionTree<S>;
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

interface BaseState {
  loginInfo: LoginInfo;
  user: UserInfo;
}

type PItem = { id: string, txt: string };
interface ListState extends Partial<BaseState> {
  list: Array<PItem>;
}

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
  Command,
  Reducer,
  Dispatch,
  BaseState,
  PItem,
  ListState,
  ResData,
}