import * as React from 'react';

interface CollapseContextProps {
  activeKey?: Array<string | number> | string | number; // 当前激活 tab 面板的 key
  defaultActiveKey?: Array<string | number> | string | number; // 当前激活 tab 面板的 key
  setActiveKey?: Function;
  setDefaultActiveKey?: Function;
  onChange?: Function;
}

const CollapseContextArgs: CollapseContextProps = {};

const CollapseContext = React.createContext<CollapseContextProps>(CollapseContextArgs);
// @ts-ignore
export { CollapseContext, CollapseContextProps };
