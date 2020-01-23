import React from 'react';

interface ComProps {
    theme: string;
}
interface Props extends ComProps {
    url: string;
}

/**
 * class component with hoc
 */
const hoc = (WrappedComponent: React.ComponentType<ComProps>) => class extends React.Component<Props, { name: string }> {
    state = {
      name: 'hoc',
    }

    render() {
      return (
        <div>
          <h2>
            this is
            { this.state.name }
          </h2>
          <p>
            url :
            { this.props.url }
          </p>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
};

/**
 * function component with hoc
 */
// const hoc = (Com: React.FC<ComProps>): React.FC<Props> => (props) => {
//     const [name] = React.useState('function hoc');
//     return <div>
//         <h2>this is { name }</h2>
//         <p>url : { props.url }</p>
//         <Com { ...props } />
//     </div>
// }

export default hoc;
