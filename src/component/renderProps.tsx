import React, { Component } from 'react'
import { PItem } from 'types/context'

/*
 * class component with render props
 */

interface State {
    user: { name: string; email: string };
    list: Array<PItem>;
}
interface Child {
    (props: State): JSX.Element
}
interface Prop {
    render: Child;
}
class RenderProps extends Component<Prop, State> {
    state = {
        user: { name: 'alex', email: 'alex@alex.com' },
        list: [
            { 'id': '1', 'txt': 'aaa' },
            { 'id': '2', 'txt': 'bbb' },
        ]
    }

    render() {
        return <div>
            <h2>render props</h2>
            {
                this.props.render({
                    user: this.state.user,
                    list: this.state.list
                })
            }
        </div>
    }
}

export default RenderProps;