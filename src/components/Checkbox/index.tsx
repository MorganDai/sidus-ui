import * as React from 'react';
import { Icon } from '../index';
import CheckboxGroupContext from './context';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface CheckboxProps {
  icon?: React.ReactNode | string;
  activeIcon?: React.ReactNode | string;
  content: React.ReactNode | string;
  selected?: boolean;
  disabled?: boolean;
  align?: string;
  value: string | number;
}

/* eslint-disable */
// @ts-ignore
export {CheckboxProps};

const Checkbox = (props: CheckboxProps) => {
  const {
    icon = <Icon name="unchoose" />,
    activeIcon = <Icon name="choose" />,
    content,
    value,
    align = 'horizontal',
    selected = false,
    disabled = false
  } = props;
  const context = React.useContext(CheckboxGroupContext);
  // @ts-ignore
  const isDisabled = context.disabledValues.indexOf(value) !== -1;
  // @ts-ignore
  const isActive = context.activeValues.indexOf(value) !== -1;

  const [active, setActive] = React.useState(selected || isActive);
  const isHorizontal = align === 'horizontal';

  const doClick = (value: string | number) => {
    if (disabled || isDisabled) return;

    if (active) {
      // @ts-ignore
      context.onUncheck(value);
    } else {
      // @ts-ignore
      context.onCheck(value);
    }
    setActive(!active);
  };

  return (
    <CheckboxGroupContext.Consumer>
      {() => (
        <div
          className={
            genClassName('checkbox_wrapper') +
            ` ${isHorizontal ? 'horizontal' : ''} ${isDisabled ? 'disabled' : ''}`
          }
        >
          <div
            className={genClassName('checkbox_icon')}
            onClick={() => {
              doClick(value);
            }}
          >
            {active ? activeIcon : icon}
          </div>
          <div className={genClassName('checkbox_content')}>{content}</div>
        </div>
      )}
    </CheckboxGroupContext.Consumer>
  );
};

export default Checkbox;
