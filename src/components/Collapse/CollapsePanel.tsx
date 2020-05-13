import * as React from 'react';
import { CollapseContext } from './context';
import { genClassName } from '../../utils/classNames';
import { toNumArray } from '../../utils/tools';

import './index.scss';

interface CollapsePanelProps {
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  extra?: React.ReactNode;
  triggerId?: string;
  children?: any;
}

const CollapsePanel = (props: CollapsePanelProps) => {
  const {
    id = '',
    header,
    disabled = false,
    className = '',
    triggerId = '',
    children
  } = props;

  const ref = React.useRef(null);
  const ctx = React.useContext(CollapseContext);
  const [height, setHeight] = React.useState(0);
  const [collapsed, setCollapsed] = React.useState(
    // @ts-ignore
    toNumArray(ctx.activeKey).indexOf(+id) === -1
  );
  const cls = genClassName('collapse_wrapper-inner') + ' ' + className;

  const trigger = (e: React.MouseEvent<HTMLDivElement>) => {
    const specifyTrigger = triggerId ? document.querySelector(`#${triggerId}`) : null;

    // @ts-ignore
    const noContainsAndNotEqual = specifyTrigger ? specifyTrigger !== e.target && !specifyTrigger.contains(e.target)  : false;

    if (disabled || (triggerId && noContainsAndNotEqual)) {
      return;
    }

    // @ts-ignore
    const idx = toNumArray(ctx.activeKey).indexOf(+id);
    let nextRes = false;

    if (idx === -1) {
      // @ts-ignore
      ctx.setActiveKey([...toNumArray(ctx.activeKey), +id]);
    } else {
      // @ts-ignore
      const temp = toNumArray(ctx.activeKey);
      temp.splice(idx, 1);
      nextRes = true;
      // @ts-ignore
      ctx.setActiveKey([...temp]);
    }

    setCollapsed(nextRes);
    ctx.onChange && ctx.onChange(nextRes);
  };

  React.useEffect(() => {
    if (collapsed) {
      setHeight(0);
    } else {
      // @ts-ignore
      setHeight(ref.current.clientHeight);
    }
  }, [collapsed]);

  const collapseCls =
    genClassName('collapse_content') + ' ' + (collapsed ? 'collapsed' : '');

  return (
    <CollapseContext.Consumer>
      {() => (
        <div className={cls}>
          <div
            className={genClassName('collapse_header') + (disabled ? 'disabled' : '')}
            onClick={e => {
              trigger(e);
            }}
          >
            {header}
          </div>

          <div
            className={genClassName('collapse_box')}
            style={{
              height
            }}
          >
            <div className={collapseCls} ref={ref}>
              {children}
            </div>
          </div>
        </div>
      )}
    </CollapseContext.Consumer>
  );
};

export default CollapsePanel;
