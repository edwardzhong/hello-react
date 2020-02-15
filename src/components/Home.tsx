import React, { ChangeEvent, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { getContext } from '@/context';
import { getNewList } from '@/service'
import { wrapPromise } from '@/common/util'
import NewList from './common/newList'
import { ListForm, Title, SubTitle, Tip, Input, LinkStyle } from './style/styles';

const lazyNewList = wrapPromise(getNewList);
const NewFetch = () => {
  const resource = lazyNewList();
  return <NewList resource={ resource } />;
}

const Home = () => {
  const { state, action } = getContext();
  const { user } = state;
  const { setUser } = action;
  const changeName = (e: ChangeEvent) => {
    setUser({ name: (e.target as HTMLInputElement).value });
  };

  const changeEmail = (e: ChangeEvent) => {
    setUser({ email: (e.target as HTMLInputElement).value });
  };

  return (
    <ListForm>
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
      <Link css={ LinkStyle } to="/list"> redirect to list </Link>
      <Suspense fallback={ <div>Fetching Data ...</div> }>
        <NewFetch />
      </Suspense>
    </ListForm>
  );
};

export default Home;
