import React from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components'

const PopLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  background-color: hsla(0, 0%, 0%, 0.5);
  visibility:hidden;
  opacity: 0;
  z-index: -1;
  -webkit-tap-highlight-color: transparent;
  transition: all .3s ease-in-out;
  ${props => props.active && css`
    visibility: visible;
    opacity: 1;
    z-index: 99;`
  }`

const Backdrop: React.FC<{ visible: boolean }> = ({ children, visible }) => (
  createPortal(
    <PopLayer active={ visible }>
      { children }
    </PopLayer>,
    document.getElementById('modalRoot'),
  )
);

export default Backdrop;
