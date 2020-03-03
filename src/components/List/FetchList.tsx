import React, { useState } from 'react';
import { ResData } from 'type';

type List = Array<{ id: string; title: string, content: string }>
const FetchList: React.FC<{ res: ResData<List> }> = ({ res }) => {

  const [list, setList] = useState(res.data || []);
  const toRemove = (id: string) => {
    setList(list.filter(l => l.id !== id));
  }
  console.log(list);
  // if (res.data && res.data.length) {
  if (list.length) {
    return <ul>{
      list.map((l, i) => <li key={ i } onClick={ () => toRemove(l.id) } style={ { cursor: 'pointer' } }>{ l.title }</li>)
    }
    </ul>
  }
  return <div>no data</div>
}

export default FetchList