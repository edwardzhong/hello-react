import React, { ChangeEvent, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { getContext } from '@/context';
import { getNewList } from '../service'
import NewList from './common/newList'
import { ListForm, Title, SubTitle, Tip, Input, LinkStyle } from './style/styles';
import { ResData } from 'type';

function wrapPromise(promise: Promise<ResData<any>>) {
  let status = "pending";
  let result: any;
  let suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}

const NewFetch = () => {
  const resource = wrapPromise(getNewList()).read();
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
      <Suspense fallback={ <div>Fetching Users ...</div> }>
        <NewFetch />
      </Suspense>
    </ListForm>
  );
};

export default Home;
