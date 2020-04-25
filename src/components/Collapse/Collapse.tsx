import * as React from 'react';
import { CollapseContext, CollapseContextProps } from './context';
import { genClassName } from '../../utils/classNames';
import { toNumArray } from '../../utils/tools';

interface CollapseProps extends CollapseContextProps {
  activeKey?: Array<string | number> | string | number; // 当前激活 tab 面板的 key
  defaultActiveKey?: Array<string | number> | string | number; // 当前激活 tab 面板的 key
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  children?: any;
}

const Collapse = (props: CollapseProps) => {
  const { activeKey, defaultActiveKey, children, onChange } = props;

  const [akey, setAKey] = React.useState(toNumArray(activeKey));
  const [dkey, setDKey] = React.useState(toNumArray(defaultActiveKey));

  return (
    <CollapseContext.Provider
      value={{
        activeKey: akey,
        defaultActiveKey: dkey,
        setActiveKey: setAKey,
        setDefaultActiveKey: setDKey,
        onChange
      }}
    >
      <div className={genClassName('collapse_wrapper')}>{children}</div>
    </CollapseContext.Provider>
  );
};

// @ts-ignore
Collapse.Panel = null;

export default Collapse;
