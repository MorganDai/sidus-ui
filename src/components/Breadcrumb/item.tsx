import * as React from 'react';
import { genClassName } from '../../utils/classNames';

const Item = (props) => {
  const { 
    children, 
    link, 
    rtl = false, 
    separator = '/',
    activeCls = '',
    activated, 
    cls = '' ,
    callback = () => {}
  } = props;
  return (
    <li dir={rtl ? 'rtl' : ''} className={`${genClassName('breadcrumb-item')} ${activeCls}`} >
      {
        link 
          ? (
            <a href={link} className={cls}>
              { children }
            </a>
          )
          : (
            <span className={cls} onClick={callback}>
              { children }
            </span>
          )
      }
      {
        activated 
          ? null
        : <span className={genClassName('breadcrumb-separator')}>{ separator }</span>
      }
    </li>
  )
}

Item._typeMark = 'breadcrumb_item';

export default Item;