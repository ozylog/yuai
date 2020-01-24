# yuai-tooltip
![Build](https://badgen.net/travis/ozylog/yuai/master)
![Size](https://badgen.net/bundlephobia/minzip/yuai-tooltip)
![PeerDependencies](https://badgen.net/david/peer/ozylog/yuai-tooltip)
![LatestVersion](https://badgen.net/npm/v/yuai-tooltip)
![License](https://badgen.net/npm/license/yuai-tooltip)

<!-- ![Coveralls](https://badgen.net/coveralls/c/github/ozylog/vetch/master) -->

React button components with styled-components

## Install
```
yarn install yuai-tooltip react styled-components
```

## Components

### Tooltip
```
// tree shaking
import Button from 'yuai-tooltip/dist/Button';
// or
import { Button } from 'yuai-tooltip';

import * as React from 'react';
import styled from 'styled-components';

const SubmitButton = styled(Button)`
  background: #fff;
  border: 1px solid #999;
  margin-right: 10px;
  padding: 5px 11px;

  &:hover {
    background: ${({ theme }) => theme.activeColor};
  }
`;

const HelloWorld = () => (<SubmitButton>Submit</SubmitButton>);
```

## License
MIT
