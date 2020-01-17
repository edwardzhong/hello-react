import React, { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { getContext } from '@/context'
import { BaseState } from 'type'
import { ListForm, SubTitle, Tip, Input, LinkStyle } from "./style/listForm";

const Home = () => {
    const { state, action } = getContext();
    const { user }: BaseState = state;
    const { setUser } = action;

    const changeName = (e: ChangeEvent) => {
        setUser({ name: (e.target as HTMLInputElement).value });
    }

    const changeEmail = (e: ChangeEvent) => {
        setUser({ email: (e.target as HTMLInputElement).value });
    }

    return <ListForm>
        <SubTitle>this is home page</SubTitle>
        <div>
            <p>hello, { user.name } !</p>
            <p>your email is { user.email } !</p>
            <Tip>please change the name and email !!</Tip>
        </div>
        <div>
            <Input type="text" placeholder="name" defaultValue={ user.name } onChange={ (e: ChangeEvent) => changeName(e) } />
        </div>
        <div>
            <Input type="email" placeholder="email" defaultValue={ user.email } onChange={ (e: ChangeEvent) => changeEmail(e) } />
        </div>
        <Link css={ LinkStyle } to="/edit"> redirect to edit </Link>
        <Link css={ LinkStyle } to="/list"> redirect to list </Link>
    </ListForm>
}

export default Home;