import React from 'react'
import { getContext } from '@/context'
// import { ListState } from 'types/context'

const HOC:React.FC = ({children}) => {
    const { state } = getContext();

    return children(state);
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

export default HOC;