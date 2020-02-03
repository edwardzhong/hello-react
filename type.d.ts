type Command = { type: string; arg?: any }
type Dispatch = (type: string, arg?: any) => void;
type Action<S> = (state: S, payload?: any) => any;
type Async = (dispatch: Dispatch, payload?: any) => any;
interface Reducer {
  (state: object, action: Command): object;
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
  isLoading: boolean;
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
type ActionRes = Promise<ResData<any>>;
type ActionFn<T> = (arg?: T) => ActionRes;
type AxiosFn = (url: string, param?: any) => ActionRes;

export {
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
}