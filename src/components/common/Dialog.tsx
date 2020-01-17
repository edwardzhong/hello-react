import React, { FC, MouseEventHandler } from 'react'
import Modal from './modal'
// import './style.scss'
import styled from 'styled-components'

const PopLayer = styled.div`
    position: absolute;
    left: 50%;
    top: 30%;
    transform:translate(-50%,-50%);
    width: 300px;
    z-index: 100;
    border-radius: 8px;
    box-shadow: 0 0 2px 2px hsla(0,100%,0%,.1);
    background-color: #fff;
`

const Body = styled.div`
    text-align: center;
    font-size: 16px;
    line-height: 4;
    border-bottom:1px solid #eee;
`
const Footer = styled.footer`
    display: flex;
    flex-flow:row wrap;
    justify-content:space-around;
    a{
        color: hsla(200,100%,50%,1);
        line-height: 4;
        cursor: pointer;
        &:hover{
            color: hsla(200,50%,50%,1);   
        }
    }
`

const Dialog: FC<{ visible: boolean, cancel: MouseEventHandler, confirm: MouseEventHandler }> = ({ children, visible, cancel, confirm }) => (
    <Modal visible={ visible } >
        <PopLayer>
            <Body>{ children }</Body>
            <Footer>
                <a onClick={ cancel }> cancel</a>
                <a onClick={ confirm }> yes</a>
            </Footer>
        </PopLayer>
    </Modal>
)
export default Dialog