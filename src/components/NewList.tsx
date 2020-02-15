import React from 'react';
import { ResData } from 'type';

const NewList: React.FC<{
  res: ResData<Array<{ title: string, content: string }>>
}> = ({ res }) => {
  if (res.code === 1 && res.data.length) {
    return <ul>{
      res.data.map((m, i) => <li key={ i }>{ m.title }</li>)
    }
    </ul>
  }
  return <div>no data</div>
}

export default NewList