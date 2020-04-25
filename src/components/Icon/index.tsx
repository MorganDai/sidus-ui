import * as React from 'react';
import './index.scss';

interface IconProps {
  name: string;
  cls?: string;
  size?: string;
  noHover?: boolean;
  onClick?: Function;
  hide?: boolean;
}

const Icon = (props: IconProps) => {
  const {
    name,
    cls = '',
    size = 'middle',
    noHover = false,
    onClick = () => {},
    hide = false
  } = props;
  return (
    <div className={`sidus-icon_box ${cls}`}>
      <span
        className={`sidus-icon sidus-icon_${name} ${size} ${
          noHover ? 'stop-hover' : ''
        } ${hide ? 'hide' : ''}`}
        onClick={() => {
          onClick();
        }}
      />
    </div>
  );
};

export default Icon;
