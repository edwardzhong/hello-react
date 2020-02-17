import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Info = styled.div`
  padding: 50px;
  text-align: center;
  h1{
    font-size: 50px;
    color: #666;
    text-shadow:0 1px 2px rgba(0,0,0,0.4);
  }
  p{
    padding: 20px;
    font-size: 20px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  button{
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 10px;
    background: #efefef;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }`

const PageNotExist = () => (
  <Info>
    <h1>404</h1>
    <p>Sorry, the page you visited does not exist.</p>
    <Link to="/"><button>返回首页</button></Link>
  </Info>
)

export default PageNotExist