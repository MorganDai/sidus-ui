import * as React from 'react';

interface CheckBoxGroupContextProps {
  activeValues?: Array<string | number>;
  disabledValues?: Array<string | number>;
  onCheck?: Function;
  onUncheck?: Function;
}

const CheckBoxGroupContextArgs: CheckBoxGroupContextProps = {
  activeValues: [],
  disabledValues: [],
  onCheck: () => {},
  onUncheck: () => {}
};

const CheckboxGroupContext = React.createContext<CheckBoxGroupContextProps>(
  CheckBoxGroupContextArgs
);

export default CheckboxGroupContext;
// @ts-ignore
export { CheckBoxGroupContextProps, CheckBoxGroupContextArgs };
