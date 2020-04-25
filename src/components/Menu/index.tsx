import * as React from 'react';
import MenuContext, { MenuContextProps } from './MenuContext';
import './index.scss';

interface MenuProps extends MenuContextProps {
  title?: string;
  defaultOpenKey?: Array<string>;
  selectedKeys?: Array<string>;
  selectable?: boolean;
  multiple?: boolean;
  onOpenChange?: Function;
  onSelect?: Function;
  children?: any;
}

const Menu = (props: MenuProps) => {
  const { title, children, activeKey = [] } = props;
  const [key, setKey] = React.useState([...activeKey]);
  const [parentSubMenu, setParentSubMenu] = React.useState(null);

  React.useEffect(() => {
    setKey([...activeKey]);
  }, [activeKey]);

  return (
    <MenuContext.Provider
      value={{
        activeKey: key,
        parentSubMenu,
        setActiveKeys: setKey,
        setParentSubMenu
      }}
    >
      <div className={`sidus-menu_wrapper`}>
        {title ? <h3 className="sidus-menu_title">{title}</h3> : ''}

        {children}
      </div>
    </MenuContext.Provider>
  );
};

// @ts-ignore
Menu.Item = null;
// @ts-ignore
Menu.ItemGroup = null;
// @ts-ignore
Menu.SubMenu = null;

export default Menu;
