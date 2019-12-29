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

interface BaseState {
    isLoading: boolean;
    loginInfo: { token: string };
    user: {
        id?: string;
        name?: string;
        email?: string;
    },
}

type PItem = { id: string, txt: string };
interface ListState extends Partial<BaseState> {
    list: Array<PItem>;
}

export {
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