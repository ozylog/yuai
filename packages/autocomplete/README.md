# yuai-autocomplete
![Build](https://badgen.net/travis/ozylog/yuai/master)
![Size](https://badgen.net/bundlephobia/minzip/yuai-autocomplete)
![PeerDependencies](https://badgen.net/david/peer/ozylog/yuai-autocomplete)
![LatestVersion](https://badgen.net/npm/v/yuai-autocomplete)
![License](https://badgen.net/npm/license/yuai-autocomplete)

<!-- ![Coveralls](https://badgen.net/coveralls/c/github/ozylog/vetch/master) -->

React autocomplete components with styled-components

## Install
```
yarn install yuai-autocomplete react styled-components
```

## Components

### Autocomplete
```javascript
import * as React from 'react';
import styled from 'styled-components';
import { Autocomplete, Option } from 'yuai-Autocomplete';

const StyledAutocomplete = styled(Autocomplete)`
  .yuai-autocomplete-input {
    padding: 10px 25px 10px 15px;
    font-size: 17px;
    width: 100%;
    border-radius: 3px 0 0 3px;
  }
`;

const HelloWorld = () => {
  const [ value, setValue ] = React.useState<Option | null>(null);
  const onSearch = (keyword) => getOption(keyword);
  const onChange = (selectedOption: Option | null) => setValue(selectedOption);

  return (
    <StyledAutocomplete
      required
      onSearch={onSearch}
      onChange={onChange}
    />
  );
};
```

## License
MIT
