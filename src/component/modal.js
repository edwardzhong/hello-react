import React from 'react'
import { createPortal } from 'react-dom';

const Modal = ({ children, visible }) => (
    createPortal(
        <div className="modal" className={ visible ? 'show' : ''}>
            {children}
        </div>,
        document.getElementById('modalRoot')
    )
);

export default Modal;