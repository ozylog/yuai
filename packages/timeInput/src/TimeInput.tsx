import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: inline-table;
  width: 150px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  padding: 5px 9px;
  text-align: center;

  ${({ required }: { required?: boolean }) => !required && `
    padding-right: 25px !important;
  `}
`;
const Input = styled.input`
  width: 40px;
  border: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  text-align: center;

  &:focus {
    outline: 0;
  }
`;
const Select = styled.select`
  -webkit-appearance: none;
  font-family: inherit;
  font-size: inherit;
  border: none;
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

interface Props {
  className?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => any;
  required?: boolean;
}

const enum Type {
  AM='AM',
  PM='PM'
}

export default function TimeInput({ className, value: propsValue, onChange, required }: React.PropsWithChildren<Props>) {
  const [ isHourOnFocus, setIsHourOnFocus ] = React.useState<boolean>(false);
  const [ isMinuteOnFocus, setIsMinuteOnFocus ] = React.useState<boolean>(false);
  const [ isTypeOnFocus, setIsTypeOnFocus ] = React.useState<boolean>(false);
  const [ hour, setHour ] = React.useState<string>('');
  const [ minute, setMinute ] = React.useState<string>('');
  const [ type, setType ] = React.useState<Type>(Type.AM);
  const inputHour = React.useRef<HTMLInputElement>(null);
  const inputMinute = React.useRef<HTMLInputElement>(null);
  const inputType = React.useRef<HTMLSelectElement>(null);

  const doubleDigiter = (str: string): string => {
    return `${str.length < 2 ? '0' : ''}${str}`;
  };

  const getValueHour = (date: Date) => {
    let h = date.getHours();

    if (h === 0) {
      h = 12;
    } else if (h > 12) {
      h = h - 12;
    }

    return doubleDigiter(h.toString());
  };

  const setValueHour = (hour: string) => {
    let intHour = parseInt(hour);

    if (type === Type.PM) {
      if (intHour < 12) intHour = intHour + 12;
    } else if (intHour === 12) {
      intHour = 0;
    }

    return intHour;
  };

  const getValueMinute = (date: Date) => {
    const m = date.getMinutes();
    return doubleDigiter(m.toString());
  };

  const setValueMinute = (minute: string) => {
    return parseInt(minute);
  };

  let propsHour = '';
  let propsMinute = '';
  let propsType = '';

  if (propsValue) {
    propsHour = getValueHour(propsValue);
    propsMinute = getValueMinute(propsValue);
    propsType = propsValue.getHours() >= 12 ? Type.PM : Type.AM;
  }

  React.useEffect(() => {
    if (isHourOnFocus && inputHour.current) inputHour.current.select();
    if (hour) {
      if (parseInt(hour) === 0) {
        setHour('12');
      } else if (!isHourOnFocus) {
        setHour(doubleDigiter(hour));
      }
    }
  }, [ isHourOnFocus ]);

  React.useEffect(() => {
    const isNum = /^\d+$/.test(hour);
    const intHour = parseInt(hour);

    if (isHourOnFocus && isNum && (intHour > 1 || hour.length ===2)) {
      inputHour.current?.blur();
      inputMinute.current?.focus();
    }
  }, [ hour ]);

  React.useEffect(() => {
    if (isMinuteOnFocus && inputMinute.current) inputMinute.current.select();
    if (!isMinuteOnFocus && minute) setMinute(doubleDigiter(minute));
  }, [ isMinuteOnFocus ]);

  React.useEffect(() => {
    const isNum = /^\d+$/.test(minute);
    const intMinute = parseInt(minute);

    if (isMinuteOnFocus && isNum && (intMinute > 5 || minute.length ===2)) {
      inputMinute.current?.blur();
      inputType.current?.focus();
    }
  }, [ minute ]);

  React.useEffect(() => {
    if (hour && minute && onChange) {
      let date;

      if (propsValue) {
        date = new Date(propsValue.getTime());
      } else {
        date = new Date();
        date.setSeconds(0)
      }

      date.setHours(setValueHour(hour));
      date.setMinutes(setValueMinute(minute));

      onChange(date);
    }
  }, [ hour, minute, type ]);

  const onChangeHour = (hour: string) => {
    if (hour === '') {
      setHour('');
      return;
    }
    const isNum = /^\d+$/.test(hour);
    if (!isNum) return;
    const intHour = parseInt(hour);

    if (0 <= intHour && intHour <= 12) {
      setHour(hour);
      if (!minute) setMinute('00');
    }
  };

  const onChangeMinute = (minute: string) => {
    if (minute === '') {
      setMinute('');
      return;
    }
    const isNum = /^\d+$/.test(minute);
    if (!isNum) return;

    const intMinute = parseInt(minute);

    if (0 <= intMinute && intMinute <= 59) {
      setMinute(minute);
      if (!hour) setHour('12');
    }
  };

  const onChangeType = (type: string) => {
    setType(type as Type);
  };

  const removeValue = () => {
    setHour('');
    setMinute('');
    setType(Type.AM);

    if (onChange) onChange(null);
  }

  const hourValue = isHourOnFocus ? hour : (propsHour || hour);
  const minuteValue = isMinuteOnFocus ? minute : (propsMinute || minute);
  const typeValue = isTypeOnFocus ? type : (propsType || type);
  let icon = <React.Fragment />;

  if (!required && (hourValue || minuteValue || typeValue)) {
    icon = <RemoveIcon className='yuai-time-input-remove-icon' onClick={removeValue}/>;
  }

  return (
    <Container required={required} className={className}>
      <Input
        className='yuai-time-input yuai-time-input-hours'
        type='text'
        maxLength={2}
        value={hourValue}
        ref={inputHour}
        placeholder='hh'
        onChange={(e) => onChangeHour(e.target.value)}
        onFocus={(e) => setIsHourOnFocus(true)}
        onBlur={() => setIsHourOnFocus(false)}
      />
      :<Input
        className='yuai-time-input yuai-time-input-minutes'
        type='text'
        maxLength={2}
        value={minuteValue}
        ref={inputMinute}
        placeholder='mm'
        onChange={(e) => onChangeMinute(e.target.value)}
        onFocus={() => setIsMinuteOnFocus(true)}
        onBlur={() => setIsMinuteOnFocus(false)}
      />
      &nbsp;
      <Select
        ref={inputType}
        onChange={(e) => onChangeType(e.target.value)}
        onFocus={() => setIsTypeOnFocus(true)}
        onBlur={() => setIsTypeOnFocus(false)}
        value={typeValue}
      >
        <option value={Type.AM}>{Type.AM}</option>
        <option value={Type.PM}>{Type.PM}</option>
      </Select>
      {icon}
    </Container>
  );
}
