import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components'

const MaskLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 100%, 0%, 0.5);
  z-index: 99;
  display: ${props => props.visible ? 'block' : 'none'};
  opacity: ${props => props.active ? '1' : '0'};
  transition: .3s ease-in-out;`

const Mask: React.FC<{ visible: boolean,active:boolean }> = ({ children, visible, active }) => (
  createPortal(
    <MaskLayer active={ active } visible ={visible}>
      { children }
    </MaskLayer>,
    document.getElementById('modalRoot'),
  )
);

export default Mask;
