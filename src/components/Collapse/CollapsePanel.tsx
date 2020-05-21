import * as React from 'react';
import { CollapseContext } from './context';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface CollapsePanelProps {
  header: React.ReactNode;
  disabled?: boolean;
  className?: string;
  activeCls?: string;
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
    activeCls = '',
    triggerId = '',
    children
  } = props;

  const ref = React.useRef(null);
  const ctx = React.useContext(CollapseContext);
  const [ignoreFirstTrigger, setIgnoreFirstTrigger] = React.useState(true);
  const [height, setHeight] = React.useState(0);
  // @ts-ignore
  const [collapsed, setCollapsed] = React.useState( ctx.activeKey.indexOf(+id) === -1 );
  const cls = genClassName('collapse_wrapper') + ' ' + className;
  
  const trigger = (e: React.MouseEvent<HTMLDivElement>) => {
    const specifyTrigger = triggerId ? document.querySelector(`#${triggerId}`) : null;
    // @ts-ignore
    const noContainsAndNotEqual = specifyTrigger ? specifyTrigger !== e.target && !specifyTrigger.contains(e.target)  : false;
    // @ts-ignore
    const idx = ctx.activeKey.indexOf(+id);
    let nextRes = false;

    if (disabled || (triggerId && noContainsAndNotEqual)) { return; }

    // @ts-ignore
    if (idx === -1) { ctx.setActiveKey([...ctx.activeKey, +id]); }
    if (idx !== -1) {
      // @ts-ignore
      const temp = [ ...ctx.activeKey ];
      
      temp.splice(idx, 1);
      // @ts-ignore
      nextRes = true;
      // @ts-ignore
      ctx.setActiveKey([...temp]);
    }

    setCollapsed(nextRes);
    ctx.onChange && ctx.onChange(nextRes);
  };

  React.useEffect(() => {
    // @ts-ignore
    if (!collapsed) { setHeight(ref.current.clientHeight); }
  }, [children]);

  React.useEffect(() => {
    // @ts-ignore
    if (collapsed) { setHeight(0); } else { setHeight(ref.current.clientHeight); }
  }, [collapsed]);

  const collapseCls = genClassName('collapse_content') + ' ' + (collapsed ? 'collapsed' : '');

  return (
    <CollapseContext.Consumer>
      {() => (
        <div className={cls + (collapsed ? '' : ` ${activeCls}`)} >
          <div
            className={genClassName('collase_header') + (disabled ? ' disabled' : '')}
            onClick={ e => {
              if (ignoreFirstTrigger) {
                setIgnoreFirstTrigger(false); 
              }

              if (ignoreFirstTrigger && collapsed) { 
                return;
              }
              trigger(e); 
            }}
          >
            { header }
          </div>

          <div
            className={genClassName('collapse_box')}
            style={{ height }}
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
