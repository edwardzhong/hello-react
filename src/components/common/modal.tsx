import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components'

const ModelLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 100%, 0%, 0.5);
  z-index: 99;
  display: ${props => props.active ? 'block' : 'none'};
`
const Modal: React.FC<{ visible: boolean }> = ({ children, visible }) => (
  createPortal(
    <ModelLayer active={ visible }>
      { children }
    </ModelLayer>,
    document.getElementById('modalRoot'),
  )
);

export default Modal;
