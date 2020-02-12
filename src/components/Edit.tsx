import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getContext } from '@/context';
import Dialog from './common/Dialog';
import {
  ListForm, SubTitle, Tip, Input, Button, LinkStyle,
} from './style/styles';

const ListEdit = () => {
  const { state, action } = getContext();
  const { user, list } = state;
  const { removeComment, addComment } = action;
  const [visible, setVisible] = useState(false);
  const [comId, setComId] = useState('');
  const inputRef = useRef(null);

  const showDialog = (id: string) => {
    setVisible(true);
    setComId(id);
  };
  const confirmHandle = () => {
    setVisible(false);
    removeComment({ id: comId });
  };

  const cancelHandle = () => {
    setVisible(false);
  };

  const add = () => {
    const input = inputRef.current;
    const val = input.value.trim();
    if (!val) return;
    addComment({
      id: Math.round(Math.random() * 1000000),
      txt: val,
    });
    input.value = '';
  };

  const UL = styled.ul`
        list-style-type: none;
        margin: 0 0 15px 0;
        padding: 0;
        li{
            padding: 5px;
            width: 90%;
            border-bottom: 1px solid #eee;
            margin-bottom: 5px;
        }`;

  return (
    <>
      <ListForm>
        <SubTitle>This is list page</SubTitle>
        <div>
          <p>
            hello,
            { user.name }
            {' '}
            !
          </p>
          <p>
            your email is
            { user.email }
            {' '}
            !
          </p>
          <Tip>please add and remove the list item !!</Tip>
        </div>
        <UL>
          {
            list.map((l, i) => (
              <li key={i}>
                { l.txt }
                <i className="icon-minus" title="remove item" onClick={() => showDialog(l.id)} />
              </li>
            ))
          }
        </UL>
        <Input ref={inputRef} type="text" />
        <Button onClick={add} title="add item">Add Item</Button>
        <Link css={LinkStyle} to="/">redirect to home</Link>
      </ListForm>
      <Dialog visible={visible} confirm={confirmHandle} cancel={cancelHandle}>remove this item ?</Dialog>
    </>
  );
};

export default ListEdit;
