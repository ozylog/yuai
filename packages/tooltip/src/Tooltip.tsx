import * as React from 'react';
import styled from 'styled-components';

export const enum Position {
  BOTTOM_LEFT = 'bottomLeft',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_RIGHT = 'bottomRight'
}

interface Props {
  content: React.ReactElement;
  position: Position;
}

const Base = styled.span`
  display: inline-block;
  position: 'relative;
`;
const Tip = styled.span`
  border-radius: 3px;
  color: #ccc;
  opacity: 0;
  padding: 2px 8px;
  pointer-events: none;
  position: absolute;
  z-index: 1;

  &:before {
    border-bottom: 6px solid rgba(51, 51, 51, 0.7);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    content: "";
    display: inline-block;
    position: absolute;
    top: -6px;
  }

  ${({ position }: { position: Position }) => {
    if (position === Position.BOTTOM_CENTER) {
      return `
        &:before, &:after {
          left: calc(50% - 6px);
        }
      `;
    } else if (position === Position.BOTTOM_LEFT) {
      return `
        &:before {
          left: 9px;
        }
        &:after {
          left: 10px;
        }
      `;
    } else if (position === Position.BOTTOM_RIGHT) {
      return `
        &:before {
          right: 9px;
        }
        &:after {
          right: 10px;
        }
      `;
    }
  }}

`;

export default function Tooltip({ children, content, position = Position.BOTTOM_CENTER }: React.PropsWithChildren<Props>) {
  return (
    <Base>
      {children}
      <Tip position={position}>{content}</Tip>
    </Base>
  );
}
