import React from 'react'
import { Link } from 'react-router-dom'
import hoc from '@/component/hoc'
import funHoc from '@/component/functionHoc'
import RenderProps from '@/component/renderProps'
import FunctionRender from '@/component/functionRender'
import './style.scss'
import { ListState } from 'types/context'

// @hoc
class ComA extends React.Component<{ theme: string }, {}>{
    render() {
        return <div>the theme is { this.props.theme }</div>
    }
}
const HocA = hoc(ComA);

const ComFun: React.FC = () => (
    <div>this is function hoc</div>
)
const HocFun = funHoc(ComFun);

// const ComB: React.FC<{ theme: string }> = ({ theme }) => (
//     <div>the theme is { theme }</div>
// )
// const HocB = hoc(ComB);

const List = () => (
    <>
        <HocA theme="blue" url="http://aa.com" />
        <HocFun url="http://ccc.com" />
        <RenderProps render={
            ({ user, list }: ListState) => <div>
                <div>name: { user.name }</div>
                <div>Email: { user.email }</div>
                <ul>
                    {
                        list.map((l, i) => <li key={ i }>{ l.txt } </li>)
                    }
                </ul>
            </div>
        } />
        <FunctionRender name="Function Props">{
            ({ list }: ListState) => <>
                <ul>
                    {
                        list.map((l, i) => <li key={ i }>{ l.txt } </li>)
                    }
                </ul>
                <Link to="/">home</Link>
            </>
        }
        </FunctionRender>
    </>
)

export default List;