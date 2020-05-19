import * as React from 'react';
import { genClassName } from '../../utils/classNames';
import Item from './item';
import './index.modules.scss';

interface BreadcrumbProps {
  activeCls?: string;
  activeIdx?: string | number;
  separator?: React.ReactNode;
  maxNode?: Number;
  children?: Array<React.ReactNode>;
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const {
    separator = '/',
    // maxNode = 'auto',
    children = [],
    activeCls = '',
    activeIdx = -1
  } = props;

  children.forEach(element => {
    // @ts-ignore
    if (!(element && (typeof element.type === 'function') && element.type._typeMark === 'breadcrumb_item')) {
      throw new Error(
        "Breadcrumb's children must be Breadcrumb.Item!"
    );
    }
  });

  let items: Array<React.ReactNode> = [];
  const length = children.length;

  children.forEach((child, i) => {
    const isActiveIdx = +activeIdx === -1 
      ? (i === length - 1)
      : (i === +activeIdx);
    items.push(
      // @ts-ignore
      React.cloneElement(child,
        {
          separator,
          key: i,
          activeCls: isActiveIdx ? activeCls : '',
          activated: i === length - 1
        }
      )
    )
  })

  return (
    <div className={genClassName('breadcrumb-wrapper')}>
      <ul className={genClassName('breadcrumb')}>
        { items }
      </ul>
    </div>
  )
}

Breadcrumb.Item= Item;

export default Breadcrumb;