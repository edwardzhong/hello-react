import React from 'react';
import { ResData } from 'type';

const NewList: React.FC<{
  resource: ResData<Array<{ title: string, content: string }>>
}> = ({ resource }) => {
  if (resource.code === 1 && resource.data.length) {
    return <ul>{
      resource.data.map((m, i) => <li key={ i }>{ m.title }</li>)
    }
    </ul>
  }
  return <div>no data</div>
}

export default NewList