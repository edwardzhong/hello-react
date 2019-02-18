import React from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../context'
import './home.scss'

const Home = () => {
    const { state, actions } = getContext();
    const { user } = state;
    const { updateName, updateEmail } = actions;

    const changeName = (e) => {
        console.log(e.target.type);
        updateName({ name: e.target.value });
    }

    const changeEmail = (e) => {
        updateEmail({ email: e.target.value });
    }

    return <div styleName="form">
        <h3 styleName="sub-title">This is home page</h3>
        <div>
            <p>hello, {user.name} !</p>
            <p>your email is {user.email} !</p>
            <p styleName="tip">please change the name and email !!</p>
        </div>
        <div><input type="text" placeholder="name" defaultValue={user.name} onChange={(e) => changeName(e)} /></div>
        <div><input type="email" placeholder="email" defaultValue={user.email} onChange={(e) => changeEmail(e)} /></div>
        <Link styleName="link" to="/list">redirect to list</Link>
    </div>
}

export default Home;