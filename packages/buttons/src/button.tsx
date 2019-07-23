import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Btn = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 5px 9px;
  border: 0;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
`;

export default function Button({ children, ...others }: React.PropsWithChildren<Props>) {
  return (
    <Btn { ...others }>{children}</Btn>
  );
}

Button.defaultProps = {
  type: 'button'
};
