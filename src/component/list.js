import React, { useRef, useContext } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Context from '../context'
import * as actions from '../action'
import './style.scss'

const List = () => {
    const ctx = useContext(Context);
    const { user, list } = ctx.state;
    const inputRef = useRef(null);
    const { removeComment, addComment } = bindActionCreators(actions, ctx.dispatch);

    const remove = id => {
        console.log(id);
        removeComment(id);
    }

    const add = () => {
        const input = inputRef.current;
        console.log(input.value);
        addComment({
            id: Math.round(Math.random() * 1000000),
            txt: input.value
        });
        input.value = '';
    }
    return <div styleName="form">
        <h3>list</h3>
        <div>
            <p>hello, {user.name} !</p>
            <p>your email is {user.email} !</p>
        </div>
        <ul>
            {
                list.map(l =>
                    <li key={l.id}>{l.txt}<i onClick={() => remove(l.id)}>&minus;</i></li>
                )
            }
        </ul>
        <input ref={inputRef} type="text" />
        <button onClick={add}>Add Item</button>
        <Link to="/">home</Link>
    </div>
}

export default List;