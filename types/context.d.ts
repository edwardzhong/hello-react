type List<T> = [T];
type PItem = { id: string, txt: string };

interface Store {
    states: object;
    actions: object;
    asyncs: object;
}

interface Action {
    type: string;
    arg?: any
}

interface Reducer {
    (state: object, action: Action): object;
}

interface Dispatch {
    (type: string, arg?: any): void
}

interface BaseState {
    isLoading: boolean;
    loginInfo: { token: string };
    user: {
        id: string;
        name: string;
        email: string;
    },
}

interface ListState extends BaseState {
    list: List<PItem>;
}

export {
    Store,
    BaseState,
    ListState,
    List,
    PItem,
    Action,
    Reducer,
    Dispatch
}