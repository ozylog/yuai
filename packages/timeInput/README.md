# yuai-time-input
![Build](https://badgen.net/travis/ozylog/yuai/master)
![Size](https://badgen.net/bundlephobia/minzip/yuai-time-input)
![PeerDependencies](https://badgen.net/david/peer/ozylog/yuai-time-input)
![LatestVersion](https://badgen.net/npm/v/yuai-time-input)
![License](https://badgen.net/npm/license/yuai-time-input)

<!-- ![Coveralls](https://badgen.net/coveralls/c/github/ozylog/vetch/master) -->

React time input components with styled-components

## Install
```
yarn install yuai-time-input react styled-components
```

## Components

### TimeInput
```javascript
import * as React from 'react';
import styled from 'styled-components';
import { TimeInput, Option } from 'yuai-time-input';

const StyledTimeInput = styled(TimeInput)`
  border-radius: 5px;
  padding: 9px 15px;
`;

const HelloWorld = () => {
  const [ time, setTime ] = React.useState<Date | null>(null);
  const onChange = (date: Date | null) => setTime(date));

  return (
    <StyledTimeInput required value={time} onChange={onChange} />
  );
};
```

## License
MIT
