import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import Dialog from '../../component/dialog'
import './style.scss'

const List = () => {
    const { state, actions } = getContext();
    const { user, list } = state;
    const { removeComment, addComment } = actions;
    const [visible, setVisible] = useState(false);
    const [rid, setRid] = useState('');
    const inputRef = useRef(null);

    const confirmHandle = () => {
        setVisible(false);
        removeComment(rid);
    }

    const cancelHandle = () => {
        setVisible(false);
    }

    const add = () => {
        const input = inputRef.current;
        const val = input.value.trim();
        if (!val) return;
        addComment({
            id: Math.round(Math.random() * 1000000),
            txt: val
        });
        input.value = '';
    }

    // return <>
    //     <div styleName="form">
    //         <h3 styleName="sub-title">This is list page</h3>
    //         <div>
    //             <p>hello, {user.name} !</p>
    //             <p>your email is {user.email} !</p>
    //             <p styleName="tip">please add and remove the list item !!</p>
    //         </div>
    //         <ul> {
    //             list.map(l => <li key={l.id}>{l.txt}<i className="icon-minus" title="remove item" onClick={() => {
    //                 setVisible(true);
    //                 setRid(l.id);
    //             }}></i></li>)
    //         } </ul>
    //         <input ref={inputRef} type="text" />
    //         <button onClick={add} title="add item">Add Item</button>
    //         <Link styleName="link" to="/">redirect to home</Link>
    //     </div>
    //     <Dialog visible={visible} confirm={confirmHandle} cancel={cancelHandle}>remove this item ?</Dialog>
    // </>
    return pug`
        div(styleName="form")
            h3(styleName="sub-title") This is list page
            div
                p hello, #{user.name} !
                p your email is #{user.email} !
                p(styleName="tip") please add and remove the list item !!
            ul 
                each l in list
                    li(key=l.id) #{l.txt}
                        i.icon-minus(title="remove item" onClick=() => {
                            setVisible(true);
                            setRid(l.id);
                        })
            input(ref=inputRef type="text")
            button(onClick=add title="add item") Add Item
            Link(styleName="link" to="/") redirect to home
        Dialog(visible=visible confirm=confirmHandle cancel=()=>setVisible(false)) remove this item ?
    `
}

export default List;