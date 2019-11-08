import React, { FC, MouseEventHandler } from 'react'
import Modal from '../modal'
import './style.scss'

const Dialog: FC<{ visible: boolean, cancel: MouseEventHandler, confirm: MouseEventHandler }> = ({ children, visible, cancel, confirm }) => (
    <Modal visible={ visible } >
        <div styleName="dialog">
            <div styleName="body">{ children }</div>
            <div styleName="foot">
                <a onClick={ cancel }> cancel</a>
                <a onClick={ confirm }> yes</a>
            </div>
        </div>
    </Modal>
)
export default Dialog