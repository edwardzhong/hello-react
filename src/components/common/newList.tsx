import React from 'react';
import { ResData } from 'type';

const NewList: React.FC<{
  resource: ResData<Array<{ title: string, content: string }>>
}> = ({ resource }) => {
  if (resource.code !== 1) {
    return <div> error code </div>
  } else if (!resource.data || !resource.data.length) {
    return <div>no data</div>
  } else {
    return <ul>{
      resource.data.map((m, i) => <li key={ i }>{ m.title }</li>)
    }
    </ul>
  }
}

export default NewList