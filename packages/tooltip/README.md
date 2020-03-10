# yuai-tooltip
![Build](https://badgen.net/travis/ozylog/yuai/master)
![Size](https://badgen.net/bundlephobia/minzip/yuai-tooltip)
![PeerDependencies](https://badgen.net/david/peer/ozylog/yuai-tooltip)
![LatestVersion](https://badgen.net/npm/v/yuai-tooltip)
![License](https://badgen.net/npm/license/yuai-tooltip)

<!-- ![Coveralls](https://badgen.net/coveralls/c/github/ozylog/vetch/master) -->

React tooltip components with styled-components

## Install
```
yarn install yuai-tooltip react styled-components
```

## Components

### Tooltip
```javascript
import { Tooltip, Position } from 'yuai-tooltip';

import * as React from 'react';
import styled from 'styled-components';

const StyledTooltip = styled(Tooltip)`
  float: right;

  .yuai-tooltip {
    background: #fff;
    text-align: left;
    font-size: 14px;
    box-shadow: 0 2px 2px #aaa;
    z-index: 1;
  }
`;


const HelloWorld = () => {
  const content = (
    <ul>
      <li>Settings</li>
      <li>Sign Out</li>
    </ul>
  );
  return (
    <StyledTooltip content={content} position={Position.BOTTOM_RIGHT}>
      <Avatar />
    </StyledTooltip>
  );
};
```

## License
MIT
