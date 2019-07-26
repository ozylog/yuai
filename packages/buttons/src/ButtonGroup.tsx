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

export default function ButtonGroup({ children, ...others }: React.PropsWithChildren<Props>) {

  return (
    <BaseButtonGroup {...others}>{children}</BaseButtonGroup>
  );
}
