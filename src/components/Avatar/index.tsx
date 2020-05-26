import * as React from 'react';
import { doNothing } from '../../utils/tools';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface AvatarProps {
  url?: string;
  alt?: string;
  type?: string; // round circle
  size?: string;
  cls?: string;
  stopPropagation?: boolean;
  onHover?: Function;
  onClick?: Function;
}

const Avatar = (props: AvatarProps) => {
  const {
    url = '',
    alt = '',
    cls = '',
    type = 'circle',
    size = 'middle',
    stopPropagation = true,
    onHover,
    onClick
  } = props;

  let wrapperCls = genClassName('avatar_wrapper ' + cls + ' ' + (url ? ' fz-0 ' : ''));
  wrapperCls += type === 'circle' ? 'bdr-percent-half' : 'bdr-px-6';

  const handleClick = (e: any) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    e.nativeEvent.stopImmediatePropagation();
    onClick ? onClick(e) : doNothing();
  };

  return (
    <div className={wrapperCls + ' ' + size}>
      <div
        className={genClassName('avatar')}
        style={{ backgroundImage: url ? `url(${url})` : 'none' }}
        onMouseOver={e => (onHover ? onHover(e) : doNothing())}
        onClick={handleClick}
      >
        {alt}
      </div>
    </div>
  );
};

export default Avatar;
