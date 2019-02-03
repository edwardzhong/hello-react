import React, { useContext } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Context from '../context'
import * as actions from '../action'
import './style.scss'

const Home = () => {
    const ctx = useContext(Context);
    const { user } = ctx.state;
    const { updateName, updateEmail } = bindActionCreators(actions, ctx.dispatch);

    const changeName = (e) => {
        console.log(e.target.type);
        updateName(e.target.value);
    }

    const changeEmail = (e) => {
        updateEmail(e.target.value);
    }

    return <div styleName="form">
        <h3>home</h3>
        <div><input type="text" placeholder="name" defaultValue={user.name} onChange={(e) => changeName(e)} /></div>
        <div><input type="email" placeholder="email" defaultValue={user.email} onChange={(e) => changeEmail(e)} /></div>
        <Link to="/list">list</Link>
    </div>
}

export default Home;