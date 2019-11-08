import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '@/context'
import Dialog from '@/component/dialog'
import './style.scss'
import { ListState } from 'types/context'

const List = () => {
    const { state, action } = getContext();
    const { user, list }: ListState = state;
    const { removeComment, addComment } = action;
    const [visible, setVisible] = useState(false);
    const [comId, setComId] = useState('');
    const inputRef = useRef(null);

    const showDialog = (id: string) => {
        setVisible(true);
        setComId(id);
    }
    const confirmHandle = () => {
        setVisible(false);
        removeComment({ id: comId });
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

    return <>
        <div styleName="form">
            <h3 styleName="sub-title">This is list page</h3>
            <div>
                <p>hello, { user.name } !</p>
                <p>your email is { user.email } !</p>
                <p styleName="tip">please add and remove the list item !!</p>
            </div>
            <ul>
                {
                    list.map((l, i) => <li key={ i }>{ l.txt }
                        <i className="icon-minus" title="remove item" onClick={ () => showDialog(l.id) } />
                    </li>
                    ) }
            </ul>
            <input ref={ inputRef } type="text" />
            <button onClick={ add } title="add item">Add Item</button>
            <Link styleName="link" to="/">redirect to home</Link>
        </div>
        <Dialog visible={ visible } confirm={ confirmHandle } cancel={ cancelHandle }>remove this item ?</Dialog>
    </>
    // return pug`
    //     div(styleName="form")
    //         h3(styleName="sub-title") This is list page
    //         div
    //             p hello, #{user.name} !
    //             p your email is #{user.email} !
    //             p(styleName="tip") please add and remove the list item !!
    //         ul 
    //             each l in list
    //                 li(key=l.id) #{l.txt}
    //                     i.icon-minus(title="remove item" onClick=() => {
    //                         setVisible(true);
    //                         setRid(l.id);
    //                     })
    //         input(ref=inputRef type="text")
    //         button(onClick=add title="add item") Add Item
    //         Link(styleName="link" to="/") redirect to home
    //     Dialog(visible=visible confirm=confirmHandle cancel=()=>setVisible(false)) remove this item ?
    // `
}

export default List;