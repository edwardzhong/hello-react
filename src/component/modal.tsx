import React from 'react'
import { createPortal } from 'react-dom';

const Modal = ({ children, visible }) => (
    createPortal(
        <div className={ visible ? 'modal show' : 'modal'}>
            {children}
        </div>,
        document.getElementById('modalRoot')
    )
);

export default Modal;