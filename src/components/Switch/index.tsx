import * as React from 'react';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface SwitchProps {
  defaultStatus?: boolean;
  onChange?: Function;
  id?: string;
}

const Switch = (props: SwitchProps) => {
  const { defaultStatus = false, onChange = () => {}, id } = props;
  const [active, setActive] = React.useState(defaultStatus);
  const wrapperCls = genClassName('switch_wrapper') + ' ' + (active ? 'active' : '');

  const trigger = e => {
    e.nativeEvent.preventDefault();
    setActive(!active);
    onChange(!active);
  };

  return (
    <div id={id} className={wrapperCls} onClick={trigger}>
      <div className={genClassName('switch')}>
        <div className={genClassName('switch_inner')}></div>
      </div>
    </div>
  );
};

export default Switch;
