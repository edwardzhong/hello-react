import React, { createContext, useReducer, useContext } from 'react'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import rootReducer from './reducer'

const Context = createContext(null);

export const getContext = () => useContext(Context);

export const Provider = props => {
    //执行一遍rootReducer获取每个reducer中的默认值，最后再覆盖初始值
    const initState = Object.assign(rootReducer({}, {}), {
        user: {
            name: 'jeff',
            email: 'jeff@gmail.com'
        },
        list: [
            { id: 1, txt: 'webpack 4' },
            { id: 2, txt: 'react' },
            { id: 3, txt: 'redux' },
        ]
    });//初始状态
    const [state, dispatch] = useReducer(rootReducer, initState);
    return <Context.Provider {...props} value={{ state, dispatch, actions: { ...bindActionCreators(actions, dispatch) } }} />
};

export default Context