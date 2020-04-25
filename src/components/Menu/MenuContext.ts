import * as React from 'react';

interface MenuContextProps {
  activeKey: Array<string>;
  children?: any;
  parentSubMenu?: React.ReactNode | HTMLElement;
  setActiveKeys?: Function;
  setParentSubMenu?: Function;
}

const MenuContextArgs: MenuContextProps = {
  activeKey: [],
  parentSubMenu: null
};

const MenuContext = React.createContext<MenuContextProps>(MenuContextArgs);
export default MenuContext;
// @ts-ignore
export { MenuContextArgs, MenuContextProps, MenuContext };
