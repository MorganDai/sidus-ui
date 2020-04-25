import * as React from 'react';
import MenuItem from './MenuItem';
import MenuContext from './MenuContext';
import { genClassName } from '../../utils/classNames';

import './SubMenu.modules.scss';

interface MenuItemGroupProps {
  children?: Array<typeof MenuItem | React.ReactNode>;
  title?: string;
  cls?: string;
  titleCls?: string;
}

const MenuItemGroup = (props: MenuItemGroupProps) => {
  const { children, cls = '', title = '', titleCls = '' } = props;

  const titleClass = genClassName('item-group_title sidus-item-group');
  return (
    <MenuContext.Consumer>
      {() => (
        <div className={`${genClassName('item-group_wrapper')} ${cls}`}>
          <div className={titleClass + ' ' + titleCls}>{title}</div>
          <div className={genClassName('item-group_box')}>{children}</div>
        </div>
      )}
    </MenuContext.Consumer>
  );
};

export default MenuItemGroup;
