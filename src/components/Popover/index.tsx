import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface PopoverProps {
  content?: string | React.ReactNode;
  title?: string | React.ReactNode;
  gap?: string | number;
  children?: any;
  align?: string; // center left right top bottom, default is bottom
  rootDom?: any;
}

const Popover = (props: PopoverProps) => {
  let { rootDom } = props;
  const { title = '', content = '', gap = 15, align = 'center', children } = props;

  const [visible, setVisible] = useState(false);
  const [eventTarget, setEventTarget] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    transform: ''
  });

  const renderLayer = useCallback(
    () => {
      if (!rootDom) {
        rootDom = document.createElement('div');
        rootDom.style.position = 'absolute';
        rootDom.style.top = '0px';
        rootDom.style.left = '0px';
        rootDom.style.width = '100%';
      }

      document.body.appendChild(rootDom);

      const style = {
        left: eventTarget.left + 'px',
        top: eventTarget.top + Number(gap) + 'px',
        marginTop: `${eventTarget.height}px`,
        marginLeft: `${eventTarget.width / 2}px`,
        transform: '',
        zIndex: 1001
      };

      if (align === 'center') {
        style.transform = 'translate(-50%)';
      } else if (align === 'right') {
        style.transform = 'translateX(-100%)';
        style.marginLeft = '0';
        style.marginLeft = `${eventTarget.width}px`;
      } else if (align === 'left') {
        style.marginLeft = '0px';
      }

      const child = React.createElement(
        'div',
        {
          className: genClassName('popover-box_wrapper') + ` ${visible ? 'visible' : ''}`
        },
        <div
          className={genClassName('popover-box_context')}
          style={style}
          onClick={e => e.nativeEvent.stopImmediatePropagation()}
        >
          <div className={genClassName('popover-box_title')}>{title}</div>

          <div className={genClassName('popover-box_content')}>{content}</div>
        </div>
      );

      ReactDOM.render(child, rootDom);
    },
    [visible, eventTarget]
  );

  const showModel = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const target = {
      left: e.nativeEvent.pageX - e.nativeEvent.offsetX,
      top: e.nativeEvent.pageY - e.nativeEvent.offsetY,
      width: e.nativeEvent.target.clientWidth,
      height: e.nativeEvent.target.clientHeight,
      transform: ''
    };
    setEventTarget(target);
    setVisible(true);
  };

  const triggerInvisible = () => {
    setVisible(false);
  };

  useEffect(() => {
    renderLayer();
    document.body.addEventListener('click', triggerInvisible);

    return () => {
      if (rootDom) {
        document.body.addEventListener('click', triggerInvisible);
        document.body.contains(rootDom) && document.body.removeChild(rootDom);
      }
    };
  }, [eventTarget, renderLayer, rootDom, visible]);

  return (
    <div className={genClassName('popover_wrapper')}>
      <div className={genClassName('popover_trigger')} onClick={showModel}>
        {children}
      </div>
    </div>
  );
};

export default Popover;
