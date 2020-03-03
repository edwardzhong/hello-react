import React, { useState, useCallback, /* Suspense */ } from 'react';
import { Link } from 'react-router-dom';
import { getNewList } from '@/service'
import { useFetch } from '@/common/hooks'
// import { wrapPromise } from '@/common/util'
// import SuspenseHoc from '../common/SuspenseHoc'
// import NewList from './NewList'
import FetchList from './FetchList';
import styled from 'styled-components'

const Container = styled.div`
  padding:20px;
  width:400px;
  margin:0 auto;`

const Pages = styled.ul`
  li{
    display: inline-block;
    padding: 10px;
    color:hsl(200,100%,50%);
    cursor: pointer;
  }`

const NavLink = styled.h2`
  color:hsl(200,60%,50%);
  `
const Title = styled.h3`
  color:hsl(150,60%,50%);`

// const fetchNewList = wrapPromise(getNewList, 2);
// const NewListFetch = () => {
//   const res = fetchNewList();
//   return <NewList res={ res } />;
// }
// const NewListFetch: React.FC<{ fetch: () => any }> = ({ fetch }) => <NewList res={ fetch() } />

// const NewListFetch = SuspenseHoc(NewList);
const List = () => {
  const [page, setPage] = useState(1);
  // const fetchNewList = useCallback(wrapPromise(getNewList, page), [page]);
  const fetch = useCallback(() => getNewList(page), [page]);
  const [isFetching, res] = useFetch(fetch);

  return <Container>
    <Link to="/">
      <NavLink>redirect to home</NavLink>
    </Link>
    {/* <Title>Suspense List</Title>
    <p>page: { page }</p>
    <Pages>
      <li onClick={ () => setPage(1) }> 1 </li>
      <li onClick={ () => setPage(2) }> 2 </li>
    </Pages>
    <Suspense fallback={ <div>Fetching Data ...</div> }>
      <NewListFetch fetch={ fetchNewList } />
    </Suspense> */}
    <Title>Hooks List</Title>
    <p>page: { page }</p>
    <Pages>
      <li onClick={ () => setPage(1) }> 1 </li>
      <li onClick={ () => setPage(2) }> 2 </li>
    </Pages>
    {
      isFetching
        ? <div>loading...</div>
        : <FetchList res={ res } />
    }
  </Container>
}

export default List