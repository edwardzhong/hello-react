import React, { useState } from 'react'
import Modal from '../modal'
import './style.scss'

const Dialog = ({ children, visible, cancel, confirm }) => pug`
    Modal(visible=visible)
        div(styleName="dialog")
            div(styleName="body") #{children}
            div(styleName="foot") 
                a(href="javascript:;" onClick=cancel) cancel
                a(href="javascript:;" onClick=confirm) yes
`

export default Dialog