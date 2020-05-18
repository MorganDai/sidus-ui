import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface PopupProps {
  content: React.ReactNode | HTMLElement;
  title?: React.ReactNode | HTMLElement;
  bg?: string;
  isLoading ?: boolean;
  noContentCls?: boolean;
  cls?: string;
}

const genEle = config => {
  const {
    show = false,
    children = [<div>Should Be Content Here!</div>],
    noContentCls = false,
    bg
  } = config;

  return React.createElement(
    'div',
    {
      className: genClassName('popup_wrapper'),
      style: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: bg,
        top: 0,
        left: 0,
        zIndex: 1024,
        display: show ? 'block' : 'none'
      }
    },
    <div
      className={
        genClassName('popup_box') + (noContentCls ? ' no-content ' : '') + ' bdr-px-10'
      }
    >
      {[
        ...children.map((item, index) => {
          const cls = index
            ? genClassName('popup_content' + (noContentCls ? '' : ' bg-fff'))
            : genClassName('popup_title') + ' text-center';
          return item ? (
            <div key={`sidus-popup_${index}`} className={cls}>
              {item}
            </div>
          ) : null;
        })
      ]}
    </div>
  );
};

function Popup(props: PopupProps) {
  const {
    content = <div>Should Be Content Here!</div>,
    title = null,
    bg = 'rgba(153, 153, 153, .6)',
    noContentCls = false,
    isLoading = false,
    cls = ''
  } = props;
  let loadingPop = isLoading;
  const wrapper = document.createElement('div');
  // const element = genEle({ show: false, children: [title, content], bg });
  wrapper.id = genClassName('popup_wrapper' + Math.floor(Math.random() * 1000000));
  wrapper.className += ` ${cls}`;

  // ReactDOM.render(element, wrapper);
  // document.documentElement.appendChild(wrapper);

  return {
    show: () => {
      // 检查wrapper是否绑定在document上
      if (document.documentElement.contains(wrapper) && !isLoading) {
        document.documentElement.removeChild(wrapper);
      }

      if (loadingPop) {
        return;
      }

      ReactDOM.render(
        genEle({ show: true, children: [title, content], bg, noContentCls }),
        wrapper
      );

      document.documentElement.appendChild(wrapper);
      loadingPop = true;
    },

    close: () => {
      if (document.documentElement.contains(wrapper)) {
        // hack 方法解决连续打开弹窗 闪烁的问题
        setImmediate(() => {
          document.documentElement.removeChild(wrapper);
        });
      }
    }
  };
}

export default Popup;
