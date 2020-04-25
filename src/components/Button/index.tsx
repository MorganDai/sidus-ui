import * as React from 'react';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface ButtonProps {
  disabled?: boolean;
  id?: string;
  cls?: string;
  type?: string;
  href?: string;
  shape?: string;
  onClick?: Function;
  children?: any;
}

const Button = (props: ButtonProps) => {
  const {
    disabled = false,
    shape = 'round',
    cls = '',
    type = '',
    id = '',
    onClick,
    children
  } = props;

  const handler = (e: any) => {
    if (!disabled) {
      onClick && onClick(e);
    }
  };

  const btnCls = `${genClassName('button')} ${type} ${shape} ${
    disabled ? 'disabled' : ''
  }`;

  return (
    <div className={genClassName('button_wrapper')}>
      <div className={btnCls + ' ' + cls} onClick={handler} id={id}>
        {children}
      </div>
    </div>
  );
};

export default Button;
