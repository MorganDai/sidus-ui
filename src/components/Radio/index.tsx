import * as React from 'react';

import './index.scss';

interface RadioInterface {
  checked?: boolean;
  label?: string;
  labelTriggle?: boolean;
  onChange?: Function;
  children?: any;
}

const Radio = (props: RadioInterface) => {
  const { label, children, labelTriggle = false, onChange } = props;

  const [checked, setChecked] = React.useState(false);

  const trigger = () => {
    setChecked(!checked);
  };

  React.useEffect(() => {
    onChange && onChange(checked);
  }, [checked]);

  return (
    <div className="sidus-radio_wrapper">
      <span className={`sidus-radio ${checked ? 'checked' : ''}`} onClick={trigger} />
      {children || label ? (
        <div
          className="sidus-radio-label"
          tabIndex={-1}
          onClick={labelTriggle ? trigger : () => {}}
        >
          {label || children}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Radio;
