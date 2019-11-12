import React from 'react'

interface Props {
    url: string;
}

const funHoc = (Com: React.FC<{}>): React.FC<Props> => (props) => {
    const [name] = React.useState('function hoc');
    return <div>
        <h2>this is { name }</h2>
        <p>url : { props.url }</p>
        <Com { ...props } />
    </div>
}

export default funHoc