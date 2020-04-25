import * as React from 'react';
import MenuContext from './MenuContext';
import { doNothing } from '../../utils/tools';

import './MenuItem.modules.scss';

interface MenuItemProps {
  disabled?: boolean;
  title?: string;
  id?: string | number;
  onClick?: Function;
}

const MenuItem = (props: MenuItemProps) => {
  const context = React.useContext(MenuContext);

  const { disabled = false, title = '', id = '', onClick } = props;

  const trigger = () => {
    // @ts-ignore
    context.setActiveKeys([id]);
    onClick && onClick('' + id);
  };

  const temp = Array.isArray(context.activeKey)
    ? context.activeKey.map(item => '' + item)
    : [context.activeKey];

  const isActive = temp.indexOf('' + id) !== -1;
  return (
    <div className={`sidus-menuitem_wrapper`}>
      <div
        className={`sidus-menuitem ${isActive ? 'active' : ''}`}
        onClick={disabled ? doNothing : trigger}
      >
        {title}
      </div>
    </div>
  );
};

export default MenuItem;
