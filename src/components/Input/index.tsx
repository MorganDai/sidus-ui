import * as React from 'react';
import { resolveClassName } from '../../utils/classNames';

import './index.scss';

interface InputProps {
  align?: string;
  animation?: boolean;
  animationCls?: string | Array<string>;
  autocomplete?: boolean;
  change?: Function;
  cls?: string | Array<string>;
  disabled?: boolean;
  disabledGetCode?: boolean;
  getVeriCodeCallback?: Function;
  label?: string;
  placeholder?: string;
  required?: boolean;
  sendVeriCodeFinished?: Function;
  type?: string;
  value?: string;
  verifyCodeInterval?: number;
}

enum VERIFY_REQUEST {
  NONE,
  REQUEST,
  FINISHED
}

const Input = (props: InputProps) => {
  const {
    align = 'vertical',
    autocomplete = false,
    cls = '',
    disabled = false,
    disabledGetCode = true,
    label = '',
    type = 'text',
    required = false,
    value = '',
    verifyCodeInterval = 60,
    change = () => {},
    getVeriCodeCallback = () => {},
    sendVeriCodeFinished = () => {}
  } = props;

  const [inputs, setInputs] = React.useState(value);
  const [focused, setFocused] = React.useState(props.animation || false);
  const [status, setStatus] = React.useState(VERIFY_REQUEST.NONE);
  const [intval, setIntval] = React.useState(verifyCodeInterval);
  const timer = React.useRef(undefined);

  // 改变outline的状态
  const changeStatus: React.FocusEventHandler<HTMLInputElement> = (): void => {
    if (props.animation) {
      setFocused(!focused);
    }
  };

  // @ts-ignore
  const animationCls = resolveClassName(props.animationCls);
  const vericodeDisable = disabledGetCode || status === VERIFY_REQUEST.REQUEST;
  let className = resolveClassName(cls) + ' ';

  className += ['sidus-input_wrapper', focused ? '' : animationCls].join(' ');
  className += required ? ' required' : '';

  const triggerGetVerify = async () => {
    if (disabledGetCode) return;

    const shouldSend = await getVeriCodeCallback();

    if (!shouldSend) {
      return;
    }
    
    setStatus(VERIFY_REQUEST.REQUEST);
    setIntval(verifyCodeInterval);
    countDown();
  };

  const countDown = React.useCallback(() => {
    if (intval === 0) {
      clearInterval(timer.current);
      return;
    }

    setIntval(+intval - 1);
  }, [intval]);

  const triggerChange = (e: any) => setInputs(e.target.value);

  React.useEffect(() => {
    setInputs(value);
  }, [value]);

  React.useEffect(() => {
    if (status) {
      if (intval < 60 && intval > 0) {
        // @ts-ignore
        timer.current = setInterval(() => countDown(), 1000);
      }

      if (intval === 0) {
        sendVeriCodeFinished();
        setIntval(60);
        setStatus(VERIFY_REQUEST.FINISHED);
      }
    }

    return () => clearInterval(timer.current);
  }, [intval, status, countDown, sendVeriCodeFinished]);

  React.useEffect(() => {
    change && change(inputs);
  }, [inputs]);

  const inputBoxCls = `sidus-input_box ${type === 'verify' ? 'verify_mode ' : ''}`;

  return (
    <div
      className={
        className + ' ' + cls + (align === 'vertical' ? '' : ' align-horizontal')
      }
    >
      {label ? <p className="sidus-input_label">{label}</p> : ''}
      <div className={inputBoxCls}>
        <input
          // ref={inputRef}
          type={props.type}
          className={props.type === 'search' ? 'search' : ''}
          placeholder={props.placeholder}
          autoComplete={autocomplete ? 'on' : 'off'}
          value={inputs}
          disabled={disabled}
          onFocus={changeStatus}
          onBlur={changeStatus}
          onChange={triggerChange}
        />
        {/* 带验证码 */}
        {type === 'verify' ? (
          <div
            className={`sidus-input_verify ${vericodeDisable ? 'disabled' : ''}`}
            onClick={() => {
              triggerGetVerify();
            }}
          >
            {status === VERIFY_REQUEST.REQUEST ? `${intval}秒` : '获取验证码'}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Input;
