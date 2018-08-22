import React from 'react';
export const { Provider, Consumer } = React.createContext({});

export function withContext(WrappedComponent) {
  return function Wrapper(props) {
    return <Consumer>{value => <WrappedComponent {...props} {...value} />}</Consumer>;
  };
}
