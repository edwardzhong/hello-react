import React from 'react'
import { Link } from 'react-router-dom'
import HOC from '@/component/hoc'
import './style.scss'
import { ListState } from 'types/context'

const List = () => (
    <HOC>{({user,list})=>{<>
        <div>name: {user.name}</div>
        <div>Email: {user.email}</div>
        <ul>
            {
                list.map((l, i) => <li key={ i }>{ l.txt } </li> ) 
            }
        </ul>
        <Link to="/">home</Link>
        </>
    }
}</HOC>
)

// const NewList = HOC(List);
export default List;