/* tslint:disable */
import * as React from 'react';
import Icon from '../Icon';
import MenuItem from './MenuItem';
import MenuContext from './MenuContext';
import { genClassName } from '../../utils/classNames';

import './SubMenu.modules.scss';

interface SubMenuProps {
  popupClassName?: string;
  children?: Array<typeof MenuItem | React.ReactNode>;
  collapsed?: boolean;
  disableCollapse?: boolean;
  disabled?: boolean;
  triggerRef?: any;
  id?: string;
  title?: string;
  cls?: string;
  underSub?: boolean;
  noIcon?: boolean;
  onTitleClick?: Function;
}

const SubMenu = (props: SubMenuProps) => {
  const context = React.useContext(MenuContext);
  const {
    cls = '',
    disabled = false,
    disableCollapse = false,
    collapsed = true,
    underSub = false,
    popupClassName = '',
    noIcon = false,
    triggerRef = null,
    onTitleClick = () => {},
    children,
    title,
    id
  } = props;

  const list = React.useRef(null);
  const [status, setStatus] = React.useState(collapsed);
  const [height, setHeight] = React.useState(0);
  const [icon, setIcon] = React.useState(status ? 'right_arrow' : 'dropdown');

  const trigger = (id: string | undefined) => {
    // e.nativeEvent.stopImmediatePropagation();
    // @ts-ignore
    if (!underSub) { context.setParentSubMenu(list.current); }

    // @ts-ignore
    if (list) { setHeight(list.current.clientHeight); }

    if (disableCollapse) { return; }

    if (!status) { setHeight(0); }

    setIcon(status ? 'dropdown' : 'right_arrow');
    setStatus(!status);
    // @ts-ignore
    context.setActiveKeys(id);
    onTitleClick(id);
  };

  React.useEffect(() => {
    if (underSub && context.parentSubMenu) {
      //@ts-ignore
      const parentNode = context.parentSubMenu.parentElement;
      parentNode.style.height = 'auto';
    }
  }, [status]);

  const temp = Array.isArray(context.activeKey)
    ? context.activeKey.map(item => '' + item)
    : [context.activeKey];

  // @ts-ignore
  const isActive = temp.indexOf(id) !== -1;
  const titleCls =
    genClassName('submenu_title') + ' ' + (isActive && !disabled ? 'active' : '');

  // @ts-ignore
  const BoxDiv = React.forwardRef((props: any, ref) => <div {...props} ref={ref}>{ props.children }</div>);

  return (
    <MenuContext.Consumer>
      {() => (
        <div className={`${genClassName('submenu_wrapper')} ${popupClassName}`}>
          <BoxDiv className={titleCls} ref={triggerRef} onClick={() => trigger(id)}>
            {title}
            {!disableCollapse && !noIcon ? <Icon name={icon} /> : ''}
          </BoxDiv>
          <div
            className={genClassName('submenu_box') + ' ' + (status ? 'collapsed' : '')}
            style={{
              height: height + 'px'
            }}
          >
            <div className={genClassName('submenu_box-rep')} ref={list}>
              {children}
            </div>
          </div>
        </div>
      )}
    </MenuContext.Consumer>
  );
};

export default SubMenu;
