import React, { ChangeEvent, useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { GetContext } from '@/context';
import { ListForm, Title, SubTitle, Tip, Input, LinkStyle } from './style';

const Home = () => {
  const { state, action } = GetContext();
  const { user } = state;
  const { setUser } = action;

  const [second, setSecond] = useState(10);
  useEffect(() => {
    if (second < 1) return () => { }
    const timer = setTimeout(() => {
      setSecond(second - 1);
    }, 1000);
    return () => clearTimeout(timer)
  }, [second])

  const changeName = (e: ChangeEvent) => {
    setUser({ name: (e.target as HTMLInputElement).value });
  };

  const changeEmail = (e: ChangeEvent) => {
    setUser({ email: (e.target as HTMLInputElement).value });
  };

  return <ListForm>
    <Title>Hello Webpack React Hooks!</Title>
    <SubTitle>this is home page</SubTitle>
    <div>
      <p>
        hello,
        { user.name }
        { ' ' }
        !
      </p>
      <p>
        your email is
        { user.email }
        { ' ' }
        !
      </p>
      <Tip>please change the name and email !!</Tip>
    </div>
    <div>
      <Input type="text" placeholder="name" defaultValue={ user.name } onChange={ (e: ChangeEvent) => changeName(e) } />
    </div>
    <div>
      <Input type="email" placeholder="email" defaultValue={ user.email } onChange={ (e: ChangeEvent) => changeEmail(e) } />
    </div>
    <Link css={ LinkStyle } to="/edit"> redirect to edit </Link>
    <Link css={ LinkStyle } to="/sample"> redirect to sample </Link>
    <Link css={ LinkStyle } to="/list"> redirect to list </Link>
    <p>second: { second }</p>
  </ListForm>
};

export default Home;
