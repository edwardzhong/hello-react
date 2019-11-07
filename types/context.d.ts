interface Store {
	states:object;
	actions:object;
	asyncs:object;
}
interface Action {
    type:string;
    arg?:any
}
interface Reducer {
    (state:object, action:Action): object;
}

interface Dispatch {
    (type:string,arg?:any):void
}

export{
    Store,
    Action,
    Reducer,
    Dispatch
}