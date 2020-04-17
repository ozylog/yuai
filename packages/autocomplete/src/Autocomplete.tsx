import * as React from 'react';
import styled from 'styled-components';
import isEqual from 'lodash.isequal';

const Base = styled.span`
  position: relative;
`;

const Input = styled.input`
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  font-family: inherit;
  font-size: inherit;
  padding: 5px 25px 5px 9px;
  position: relative;

  &:focus {
    outline: 0;
  }
`;

const Options = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 0 0 3px 3px;
  font-size: 15px;
  margin-top: -1px;
  max-height: 250px;
  min-width: 100%;
  overflow-y: auto;
  position: absolute;
  left: 0;
  z-index: 1;
  display: none;

  & > div:last-child {
    border-bottom: 0;
  }

  ${({ active }: { active: boolean }) => active && `
    display: block;
  `}
`;

const Option = styled.div`
  cursor: pointer;
  padding: 7px 11px;
  border-bottom: 1px solid #f5f5f5;

  ${({ active }: { active: boolean }) => active && `
    background: #e5e5e5;
  `}
`;
const NoResultsFound = styled.div`
  padding: 7px 11px;
  text-color: #e5e5e5;
`;

const DefaultLoader = styled.span`
  position: absolute;
  top: 0;
  right: 5px;

  border: 2px solid #e5e5e5;
  border-top: 2px solid #999;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RemoveIcon = styled.span`
  position: absolute;
  top: 0;
  right: 5px;
  width: 10px;
  height: 10px;
  overflow: hidden;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    &::before, &::after {
      background: $blue;
    }
  }

  &::before, &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #000;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

let timeout: any;

export default function Autocomplete(props: React.PropsWithChildren<Props>) {
  const {
    className,
    placeholder,
    loader,
    onChange: onAutocompleteChange,
    onSearch,
    value,
    required
  } = props;
  const [ isFocus, setIsFocus ] = React.useState(false);
  const [ isBlurIgnored, setIsBlurIgnored ] = React.useState(false);
  const [ optionIndex, setOptionIndex ] = React.useState(-1);
  const [ isOptionsOpen, setIsOptionsOpen ] = React.useState(false);
  const [ keyword, setKeyword ] = React.useState('');
  const [ options, setOptions ] = React.useState<Option[]>([]);
  const [ selectedOption, setSelectedOption ] = React.useState<Option | null>(null);
  const [ isLoading, setIsLoading ] = React.useState(false)
  const inputEl = React.useRef<HTMLInputElement>(null);
  const inputOption = value || selectedOption;
  let inputValue = '';

  if (isFocus) {
    inputValue = keyword;
  } else if (inputOption) {
    inputValue = inputOption.text;
  }

  const onFocus = () => setIsFocus(true);
  const onBlur = () => {
    if (isBlurIgnored) return;

    setOptionIndex(-1);
    setIsOptionsOpen(false);
    setIsFocus(false);
    setKeyword('');
  };

  React.useEffect(() => {
    if (inputEl.current) {
      onBlur();
    }
  }, [ isBlurIgnored ]);

  const onChange = (event: any) => {
    const { value } = event.target;

    setIsOptionsOpen(value.trim().length ? true : false);
    setKeyword(value);
    setIsLoading(true);

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async() => {
      const newOptions = await onSearch(value);

      setOptions(newOptions);
      setIsLoading(false);
    }, 500);
  };

  const onClick = async() => {
    if (!isOptionsOpen) {
      setOptions([]);
      setKeyword('');
    }
  }

  const onMouseDownOption = () => {
    setIsBlurIgnored(true);
  };

  const onMouseOverOption = (index: number) => {
    setOptionIndex(index);
  };

  const onSelectOption = (option: Option | null) => {
    const inputOption = value || selectedOption;

    setIsBlurIgnored(false);

    if (isEqual(inputOption, option)) return;

    setSelectedOption(option);

    if (onAutocompleteChange) {
      onAutocompleteChange(option);
    }
  };

  const removeSelectedOption = () => {
    if (inputOption && !required) {
      onSelectOption(null);

      // @ts-ignore
      inputEl.current?.focus()
    }
  }


  const listOptions = (options: Option[]) => options.map((option, key) => (
    <Option className='yuai-autocomplete-option' key={key} active={optionIndex === key} onClick={() => onSelectOption(option)} onMouseOver={() => onMouseOverOption(key)}>{option.text}</Option>
  ));

  const noResultsFound = <NoResultsFound>No results found</NoResultsFound>;

  let icon = <React.Fragment />;

  if (isLoading) {
    icon = loader ? loader : <DefaultLoader/>;
  } else if (!required && inputOption) {
    icon = <RemoveIcon className='yuai-autocomplete-remove-icon' onClick={removeSelectedOption}/>;
  }

  return (
    <Base className={className}>
      <Input
        type='text'
        className='yuai-autocomplete-input'
        autoComplete='off'
        value={inputValue}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        placeholder={placeholder}
        ref={inputEl}
      />
      {icon}
      <Options className='yuai-autocomplete-options' onMouseDown={onMouseDownOption} active={isOptionsOpen && !isLoading}>
        {options.length ? listOptions(options) : noResultsFound}
      </Options>
    </Base>
  );
}

export interface Option {
  text: string;
  value: any;
}

interface Props {
  className?: string;
  placeholder?: string;
  loader?: JSX.Element;
  onChange?: (option: Option | null) => any;
  onSearch: (keyword: string) => Option[] | Promise<Option[]>;
  value?: Option;
  required?: boolean;
}
