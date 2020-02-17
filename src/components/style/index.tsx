import styled, { css } from 'styled-components';
import { nowrap } from '@/mixin';

export const ListForm = styled.div`
  padding: 0 20px;
  div{
      margin-bottom: 10px;
  }
  i{
    float: right;
    color:hsl(0,50%,50%);
    cursor: pointer;
  }`;

export const Title = styled.h2`
    text-align: center;`;

export const SubTitle = styled.h3`
  ${nowrap}
  text-align: center;`;

export const Tip = styled.p`color: hsl(200,100%,50%);`;

export const Input = styled.input`
  display: block;
  border:1px solid #eee;
  outline: none;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  width: 90%;
  &:focus{
    background-color:hsl(60,80%,90%);
  }`;

export const Button = styled.button`
  display: block;
  padding: 8px 20px;
  background-color: hsl(200,100%,50%);
  color:#fff;
  border-radius: 5px;
  font-size: 14px;
  margin: 10px 0;
  outline: none;
  cursor: pointer;
  &:hover{
    background-color: hsl(200,100%,70%);
  }`;

export const LinkStyle = css`
  display: block;
  font-size: 16px;
  color: hsl(200,100%,50%);
  &:hover{
    color:hsl(200,100%,70%);
  }`;
