import React, { ChangeEvent, Suspense, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getContext } from '@/context';
import { getNewList } from '@/service'
import { wrapPromise } from '@/common/util'
import SuspenseHoc from './common/SuspenseHoc'
import NewList from './NewList'
import styled from 'styled-components'
import { ListForm, Title, SubTitle, Tip, Input, LinkStyle } from './style';

const Pages = styled.ul`
  li{
    display: inline-block;
    padding: 10px;
    color:hsl(200,100%,50%);
    cursor: pointer;
  }`

// const fetchNewList = wrapPromise(getNewList, 2);
// const NewListFetch = () => {
//   const res = fetchNewList();
//   return <NewList res={ res } />;
// }

// const NewListFetch: React.FC<{ fetch: () => any }> = ({ fetch }) => <NewList res={ fetch() } />

const NewListFetch = SuspenseHoc(NewList);

const Home = () => {
  const { state, action } = getContext();
  const { user } = state;
  const { setUser } = action;
  const [page, setPage] = useState(1);
  const changeName = (e: ChangeEvent) => {
    setUser({ name: (e.target as HTMLInputElement).value });
  };

  const changeEmail = (e: ChangeEvent) => {
    setUser({ email: (e.target as HTMLInputElement).value });
  };

  // const fetchNewList = wrapPromise(getNewList, page);
  const fetchNewList = useCallback(wrapPromise(getNewList, page), [page]);

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
      <Link css={ LinkStyle } to="/sample"> redirect to sample </Link>
      <Pages>
        <li onClick={ () => setPage(1) }> 1 </li>
        <li onClick={ () => setPage(2) }> 2 </li>
      </Pages>
      <Suspense fallback={ <div>Fetching Data ...</div> }>
        <NewListFetch fetch={ fetchNewList } />
      </Suspense>
    </ListForm>
  );
};

export default Home;
