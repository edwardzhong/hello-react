import React from 'react';
import { Link } from 'react-router-dom';
import hoc from './Hoc';
import funHoc from './FunctionHoc';
import RenderProps from './RenderProps';
import FunctionRender from './FunctionRender';
import styled from 'styled-components'

const Container = styled.div`
  padding:50px;`

// @hoc
class ComA extends React.Component<{ theme: string }, {}> {
  render() {
    return (
      <div>
        the theme is
        { this.props.theme }
      </div>
    );
  }
}
const HocA = hoc(ComA);

const ComFun: React.FC = () => (
  <div>this is function hoc</div>
);
const HocFun = funHoc(ComFun);
// const ComB: React.FC<{ theme: string }> = ({ theme }) => (
//     <div>the theme is { theme }</div>
// )
// const HocB = hoc(ComB);

const Sample = () => (
  <Container>
    <HocA theme="blue" url="http://aa.com" />
    <HocFun url="http://ccc.com" />
    <RenderProps render={
      ({ user, list }) => (
        <div>
          <div>
            name:
            { user.name }
          </div>
          <div>
            Email:
            { user.email }
          </div>
          <ul>
            {
              list.map((l, i) => (
                <li key={ i }>
                  { l.txt }
                  { ' ' }
                </li>
              ))
            }
          </ul>
        </div>
      )
    }
    />
    <FunctionRender name="Function Props">
      {
        ({ list }) => (
          <>
            <ul>
              {
                list.map((l, i) => (
                  <li key={ i }>
                    { l.txt }
                    { ' ' }
                  </li>
                ))
              }
            </ul>
            <Link to="/">home</Link>
          </>
        )
      }
    </FunctionRender>
    <Link css="font-size:16px; color: hsl(200,100%,50%)" to="/"> redirect to home </Link>
  </Container>
);

export default Sample;
