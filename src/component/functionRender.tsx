import React from 'react'
import { getContext } from '@/context'
import { ListState } from 'types/context';

/* 
 * function component with render props
 */
interface Child {
    (props: ListState): JSX.Element
}
interface Prop {
    name: string;
    children: Child;
}

const FunctionRender: React.FC<Prop> = ({ name, children }) => {
    const { state } = getContext();
    // const [user] = useState({ name: 'alex', email: 'alex@alex.com' });
    // const [list] = useState([{ 'id': '1', 'txt': 'aaa' }, { 'id': '2', 'txt': 'ccc' },]);
    return <div>
        <h2>function render props by children</h2>
        <h4>this is { name }</h4>
        {
            children({ ...state })
        }
    </div>
}
export default FunctionRender;