import React from 'react'
import { getContext } from '@/context'
import { ListState } from 'types/context';

/**
 * function component with hoc
 */
interface Props {
    url: string;
}

const funHoc = (Com: React.FC): React.FC<Props> => (props) => {
    const { state } = getContext();
    const { list }: ListState = state;
    const [name] = React.useState('function hoc');
    return <div>
        <h2>this is { name }</h2>
        <Com { ...props } />
        <p>url : { props.url }</p>
        <ul>
            {
                list.map((l, i) => <li key={ i }>{ l.txt }</li>)
            }
        </ul>
    </div>
}

export default funHoc