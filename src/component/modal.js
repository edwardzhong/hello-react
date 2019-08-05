import React from 'react'
import { createPortal } from 'react-dom';

const Modal = ({ children, visible }) => (
    createPortal(pug`
        .modal(className=visible?'show':'')
            ${children}
        `,
        document.getElementById('modalRoot')
    )
);

export default Modal;