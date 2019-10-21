import React from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '../../context'
import './style.scss'

const Home = () => {
    const { state, actions } = getContext();
    const { user } = state;
    const { updateName, updateEmail } = actions;

    const changeName = (e) => {
        updateName({ name: e.target.value });
    }

    const changeEmail = (e) => {
        updateEmail({ email: e.target.value });
    }
    return  <div styleName="form">
        <h3 styleName="sub-title">this is home page</h3>
        <div>
            <p>hello, {user.name} !</p>
            <p>your email is {user.email} !</p>
            <p styleName="tip">please change the name and email !!</p>
        </div>
        <div>
            <input type="text" placeholder="name" defaultValue={user.name} onChange={e => changeName(e)} />
        </div>
        <div>
            <input type="email" placeholder="email" defaultValue={user.email} onChange= {e => changeEmail(e)} />
        </div>
        <Link styleName="link" to="/list"> redirect to list </Link>
    </div>
    // return pug`
    //     div(styleName="form")
    //         h3(styleName="sub-title") this is home page
    //         div
    //             p hello, #{user.name} !
    //             p your email is #{user.email} !
    //             p(styleName="tip") please change the name and email !!
    //         div
    //             input(type="text" placeholder="name" defaultValue=user.name onChange=(e) => changeName(e))
    //         div
    //             input(type="email" placeholder="email" defaultValue=user.email onChange=(e) => changeEmail(e))
    //         Link(styleName="link" to="/list") redirect to list
    // `
}

export default Home;