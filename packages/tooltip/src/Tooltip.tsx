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
  position: relative;
`;
const Tip = styled.span`
  border-radius: 3px;
  color: inherit;
  opacity: 0;
  padding: 2px 8px;
  pointer-events: none;
  position: absolute;
  z-index: 1;
  box-shadow: 0 0 9px #ccc;

  &:before {
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    content: " ";
    display: inline-block;
    position: absolute;
    top: -6px;
  }

  ${({ position, active }: { position: Position; active: boolean }) => {
    let style;

    if (active) {
      style = `
        opacity: 1;
        pointer-events: auto;
      `;
    }

    switch(position) {
      case Position.BOTTOM_CENTER:
        style += `
          &:before, &:after {
            left: calc(50% - 6px);
          }
        `;
        break;

      case Position.BOTTOM_LEFT:
        style += `
          &:before {
            left: 9px;
          }
          &:after {
            left: 10px;
          }
        `;
        break;

      case Position.BOTTOM_RIGHT:
        style += `
          &:before {
            right: 9px;
          }
          &:after {
            right: 10px;
          }
        `;
        break;
    }

    return style;
  }}
`;

export default function Tooltip({ children, content, position = Position.BOTTOM_CENTER }: React.PropsWithChildren<Props>) {
  const [ active, setActive ] = React.useState<boolean>(false);
  const baseRef = React.useRef<HTMLSpanElement>(null);
  const tipRef = React.useRef<HTMLSpanElement>(null);
  const inlineStyle: any = {};

  if (active && baseRef?.current && tipRef?.current) {
    // @ts-ignore
    const baseWidth = baseRef.current.offsetWidth;
    // @ts-ignore
    const baseHeight = baseRef.current.offsetHeight;
    // @ts-ignore
    const tipWidth = tipRef.current.offsetWidth;

    inlineStyle.top = baseHeight;

    switch(position) {
      case Position.BOTTOM_CENTER:
        inlineStyle.left = -1 * tipWidth / 2 + baseWidth / 2
        break;
      case Position.BOTTOM_LEFT:
        inlineStyle.left = 0;
        break;
      case Position.BOTTOM_RIGHT:
        inlineStyle.right = 0;
        break;
    }
  }

  return (
    <Base ref={baseRef} onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
      {children}
      <Tip className='tooltip' ref={tipRef} active={active} position={position} style={inlineStyle}>{content}</Tip>
    </Base>
  );
}
