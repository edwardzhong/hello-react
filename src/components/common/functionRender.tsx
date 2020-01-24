import React from 'react';
import { ListState } from 'type';
import { getContext } from '@/context';

/*
 * function component with render props
 */
interface Prop {
    name: string;
    children: (props: ListState) => JSX.Element;
}

const FunctionRender: React.FC<Prop> = ({ name, children }) => {
  const { state } = getContext();
  // const [user] = useState({ name: 'alex', email: 'alex@alex.com' });
  // const [list] = useState([{ 'id': '1', 'txt': 'aaa' }, { 'id': '2', 'txt': 'ccc' },]);
  return (
    <div>
      <h2>function render props by children</h2>
      <h4>
        this is
        { name }
      </h4>
      {
        children({ ...state })
      }
    </div>
  );
};
export default FunctionRender;
