import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {}

const BaseButtonGroup = styled.span`
  button.yuai-button:not(:first-child):not(:last-child) {
    border-radius: 0
  }

  button.yuai-button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  button.yuai-button:last-child {
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default function ButtonGroup({ children, className, ...others }: React.PropsWithChildren<Props>) {
  const classNames = ['yuai-button-group'];

  if (className) classNames.push(className);

  return (
    <BaseButtonGroup className={classNames.join(' ')} {...others}>{children}</BaseButtonGroup>
  );
}
