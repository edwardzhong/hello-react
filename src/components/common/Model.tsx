import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Mask from './mask';

const PopLayer = styled.div`
  position: fixed;
  left: 50%;
  top: 30%;
  width:300px;
  height:auto;
  transform:translate(-50%,-50%);
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0 0 2px 2px hsla(0,100%,0%,.1);
  background-color: #fff;
  overflow: hidden;
  transition: .3s ease-in-out;
  transform-style: preserve-3d;
  visibility: ${props => props.active ? 'visible' : 'hidden'};
  opacity: ${props => props.active ? '1' : '0'};
  /* max-height: ${props => props.active ? '200px' : '0'}; */
  `

const Body = styled.div`
  display: flex;
  flex-flow:column nowrap;
  justify-content:center;
  height:80px;
  padding:10px;
  text-align: center;
  font-size: 16px;
  border-bottom:1px solid #eee;`

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
  }`

type Option = {
  title?: string;
  content?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

class Model extends Component {
  state = {
    visible: false,
    maskVisible: false,
    title: '',
    content: '',
    onOk: () => { },
    onCancel: () => { },
  }

  open = (opt: Option) => {
    this.setState({ visible: true });
    this.setState({ maskVisible: true });
    if (opt.title) this.setState({ title: opt.title });
    if (opt.content) this.setState({ content: opt.content });
    if (opt.onCancel) this.setState({ onCancel: opt.onCancel });
    if (opt.onOk) this.setState({ onOk: opt.onOk });
  };

  close = () => {
    this.setState({ visible: false });
    setTimeout(() => {
      this.setState({ maskVisible: false });
    }, 300)
  };

  cancel = () => {
    this.close();
    this.state.onCancel();
  }

  confirm = () => {
    this.close();
    this.state.onOk();
  }

  render() {
    const { visible, maskVisible, title, content } = this.state
    return <>
      <Mask active={ visible } visible={ maskVisible } />
      <PopLayer active={ visible }>
        <Body>
          { title && <h3> { title }</h3> }
          { content && <p>{ content }</p> }
        </Body>
        <Footer>
          <a onClick={ this.cancel }> cancel</a>
          <a onClick={ this.confirm }> yes</a>
        </Footer>
      </PopLayer>
    </>
  }
}
const div = document.createElement('div');
document.body.appendChild(div);
const Box = ReactDOM.render(React.createElement(Model), div);

export default Box;