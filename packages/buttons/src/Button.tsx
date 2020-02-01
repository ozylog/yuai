import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const BaseButton = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  padding: 5px 9px;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
`;

export default function Button({ children, className, ...others }: React.PropsWithChildren<Props>) {
  const classNames = ['yuai-button'];

  if (className) classNames.push(className);

  return (
    <BaseButton className={classNames.join(' ')} {...others}>{children}</BaseButton>
  );
}

Button.defaultProps = {
  type: 'button'
};
