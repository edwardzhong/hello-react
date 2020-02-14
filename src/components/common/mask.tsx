import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components'

const MaskLayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  background-color: hsla(0, 100%, 0%, 0.5);
  z-index: 99;
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  opacity: ${props => props.active ? '1' : '0'};
  transition: all .3s ease-in-out;`

const Mask: React.FC<{ visible: boolean }> = ({ children, visible }) => (
  createPortal(
    <MaskLayer active={ visible }>
      { children }
    </MaskLayer>,
    document.getElementById('modalRoot'),
  )
);

export default Mask;
