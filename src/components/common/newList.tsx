import React from 'react';
import { ResData } from 'type';

const NewList: React.FC<{
  response: ResData<Array<{ title: string, content: string }>>
}> = ({ response }) => {
  if (response.code === 1 && response.data.length) {
    return <ul>{
      response.data.map((m, i) => <li key={ i }>{ m.title }</li>)
    }
    </ul>
  }
  return <div>no data</div>
}

export default NewList