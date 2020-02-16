import React, { useState, useEffect } from 'react';
import { ResData } from 'type';

const NewList: React.FC<{
  res: ResData<Array<{ id: string; title: string, content: string }>>
}> = ({ res }) => {

  const [list, setList] = useState(res.data || []);
  useEffect(() => {
    setList(res.data || [])
  }, [res]);

  const remove = (id: string) => {
    setList(list.filter(i => i.id !== id));
  }

  if (list.length) {
    return <ul>{
      list.map((l, i) => <li key={ i } onClick={ () => remove(l.id) } style={{ cursor:'pointer'}}>{ l.title }</li>)
    }
    </ul>
  }
  return <div>no data</div>
}

export default NewList