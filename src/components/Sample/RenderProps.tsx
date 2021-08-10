import React from 'react';
import { State } from 'types/type';

/*
 * class component with render props
 */
interface Prop {
  render: (props: Partial<State>) => JSX.Element;
}
// class RenderProps extends React.Component<Prop, ListState> {
//   state = {
//     user: { name: 'alex', email: 'alex@alex.com' },
//     list: [
//       { 'id': '1', 'txt': 'aaa' },
//       { 'id': '2', 'txt': 'bbb' },
//     ]
//   }

//   render() {
//     return <div>
//       <h2>render props</h2>
//       {
//         this.props.render({
//           user: this.state.user,
//           list: this.state.list
//         })
//       }
//     </div>
//   }
// }

/*
 * function component with render props
 */
const RenderProps: React.FC<Prop> = ({ render }) => {
  const [user] = React.useState({ name: 'alex', email: 'alex@alex.com' });
  const [list] = React.useState([{ id: '1', txt: 'aaa' }, { id: '2', txt: 'ccc' }]);
  return (
    <div>
      <h2>render props</h2>
      {
        render({ user, list })
      }
    </div>
  );
};

export default RenderProps;
