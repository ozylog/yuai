# yuai-buttons
![Travis](https://badgen.net/travis/ozylog/yuai/master)
![Bundlephobia](https://badgen.net/bundlephobia/minzip/yuai-buttons)
![David](https://badgen.net/david/peer/ozylog/yuai-buttons)
![npm](https://badgen.net/npm/v/yuai-buttons)
![NPM](https://badgen.net/npm/license/yuai-buttons)

<!-- ![Coveralls](https://badgen.net/coveralls/c/github/ozylog/vetch/master) -->

React button components with styled-components

## Install
```
yarn install yuai-buttons react styled-components
```

## Components

### Button
```
// tree shaking
import Button from 'yuai-buttons/dist/Button';
// or
import { Button } from 'yuai-buttons';

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

### ButtonGroup
```
// tree shaking
import Button from 'yuai-buttons/dist/Button';
import ButtonGroup from 'yuai-buttons/dist/Button';
// or
import { Button, ButtonGroup } from 'yuai-buttons';

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

const ResetButton = styled(SubmitButton)`
`;

const HelloWorld = () => (
  <ButtonGroup>
    <SubmitButton type='submit'>Submit</SubmitButton>
    <ResetButton type='reset'>Reset</ResetButton>
  </ButtonGroup>
);
```

## License
MIT
