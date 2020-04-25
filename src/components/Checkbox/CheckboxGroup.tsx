import * as React from 'react';
import Checkbox from './index';
import CheckboxGroupContext, { CheckBoxGroupContextProps } from './context';
import { genClassName } from '../../utils/classNames';

interface CheckboxGroupProps extends CheckBoxGroupContextProps {
  title?: string | React.ReactNode | HTMLElement;
  children?: Array<typeof Checkbox>;
  onSelected?: Function;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    activeValues = [],
    disabledValues = [],
    onCheck = () => {},
    onUncheck = () => {},
    children,
    title = ''
  } = props;

  const onChildCheck = (val: any) => {
    onCheck(val);
  };
  const onChildUncheck = (val: any) => {
    onUncheck(val);
  };

  return (
    <CheckboxGroupContext.Provider
      value={{
        disabledValues,
        activeValues,
        onCheck: onChildCheck,
        onUncheck: onChildUncheck
      }}
    >
      <div className={genClassName('checkbox-group_wrapper')}>
        {title ? <div>{title}</div> : ''}
        <div className={genClassName('checkbox-group_content')}>{children}</div>
      </div>
    </CheckboxGroupContext.Provider>
  );
};

export default CheckboxGroup;
