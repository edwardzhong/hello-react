import React from 'react';
import { ResData } from 'type';

type List = Array<{ id: string; title: string, content: string }>
const FetchList: React.FC<{ res: ResData<List> }> = ({ res }) => {
  console.log(res);
  if (res.data && res.data.length) {
    return <ul>{
      res.data.map((l, i) => <li key={ i }>{ l.title }</li>)
    }
    </ul>
  }
  return <div>no data</div>

}

export default FetchList