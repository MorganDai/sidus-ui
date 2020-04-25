import * as React from 'react';
import { genClassName } from '../../utils/classNames';

import './index.scss';

interface TagProps {
  label?: string;
  type?: string;
  doClick?: Function;
}

const Tag = (props: TagProps) => {
  const { label = 'label', type = '', doClick = () => {} } = props;
  const cls = type === 'primary' ? 'primary' : '';

  const triggerClick = () => {
    doClick();
  };

  return (
    <div onClick={triggerClick} className={genClassName('tag_wrapper') + ' ' + cls}>
      {label}
    </div>
  );
};

export default Tag;
