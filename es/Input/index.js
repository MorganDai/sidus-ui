"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../../utils/classNames");

require("./index.scss");

var VERIFY_REQUEST;

(function (VERIFY_REQUEST) {
  VERIFY_REQUEST[VERIFY_REQUEST["NONE"] = 0] = "NONE";
  VERIFY_REQUEST[VERIFY_REQUEST["REQUEST"] = 1] = "REQUEST";
  VERIFY_REQUEST[VERIFY_REQUEST["FINISHED"] = 2] = "FINISHED";
})(VERIFY_REQUEST || (VERIFY_REQUEST = {}));

var Input = function Input(props) {
  var _a = props.align,
      align = _a === void 0 ? 'vertical' : _a,
      _b = props.cls,
      cls = _b === void 0 ? '' : _b,
      _c = props.disabled,
      disabled = _c === void 0 ? false : _c,
      _d = props.disabledGetCode,
      disabledGetCode = _d === void 0 ? true : _d,
      _e = props.label,
      label = _e === void 0 ? '' : _e,
      _f = props.type,
      type = _f === void 0 ? 'text' : _f,
      _g = props.required,
      required = _g === void 0 ? false : _g,
      _h = props.value,
      value = _h === void 0 ? '' : _h,
      _j = props.verifyCodeInterval,
      verifyCodeInterval = _j === void 0 ? 60 : _j,
      _k = props.change,
      change = _k === void 0 ? function () {} : _k,
      _l = props.getVeriCodeCallback,
      getVeriCodeCallback = _l === void 0 ? function () {} : _l,
      _m = props.sendVeriCodeFinished,
      sendVeriCodeFinished = _m === void 0 ? function () {} : _m;

  var _o = React.useState(value),
      inputs = _o[0],
      setInputs = _o[1];

  var _p = React.useState(props.animation || false),
      focused = _p[0],
      setFocused = _p[1];

  var _q = React.useState(VERIFY_REQUEST.NONE),
      status = _q[0],
      setStatus = _q[1];

  var _r = React.useState(verifyCodeInterval),
      intval = _r[0],
      setIntval = _r[1];

  var timer = React.useRef(undefined); // 改变outline的状态

  var changeStatus = function changeStatus() {
    if (props.animation) {
      setFocused(!focused);
    }
  }; // @ts-ignore


  var animationCls = classNames_1.resolveClassName(props.animationCls);
  var vericodeDisable = disabledGetCode || status === VERIFY_REQUEST.REQUEST;
  var className = classNames_1.resolveClassName(cls) + ' ';
  className += ['sidus-input_wrapper', focused ? '' : animationCls].join(' ');
  className += required ? ' required' : '';

  var triggerGetVerify = function triggerGetVerify() {
    if (disabledGetCode) return;
    getVeriCodeCallback();
    setStatus(VERIFY_REQUEST.REQUEST);
    setIntval(verifyCodeInterval);
    countDown();
  };

  var countDown = React.useCallback(function () {
    if (intval === 0) {
      clearInterval(timer.current);
      return;
    }

    setIntval(+intval - 1);
  }, [intval]);

  var triggerChange = function triggerChange(e) {
    setInputs(e.target.value);
  };

  React.useEffect(function () {
    setInputs(value);
  }, [value]);
  React.useEffect(function () {
    if (status) {
      if (intval < 60 && intval > 0) {
        // @ts-ignore
        timer.current = setInterval(function () {
          return countDown();
        }, 1000);
      }

      if (intval === 0) {
        sendVeriCodeFinished();
        setStatus(VERIFY_REQUEST.FINISHED);
      }
    }

    return function () {
      return clearInterval(timer.current);
    };
  }, [intval, status, countDown, sendVeriCodeFinished]);
  React.useEffect(function () {
    change && change(inputs);
  }, [inputs]);
  var inputBoxCls = "sidus-input_box " + (type === 'verify' ? 'verify_mode ' : '');
  return React.createElement("div", {
    className: className + ' ' + cls + (align === 'vertical' ? '' : ' align-horizontal')
  }, label ? React.createElement("p", {
    className: "sidus-input_label"
  }, label) : '', React.createElement("div", {
    className: inputBoxCls
  }, React.createElement("input", {
    // ref={inputRef}
    type: props.type,
    className: props.type === 'search' ? 'search' : '',
    placeholder: props.placeholder,
    value: inputs,
    disabled: disabled,
    onFocus: changeStatus,
    onBlur: changeStatus,
    onChange: triggerChange
  }), type === 'verify' ? React.createElement("div", {
    className: "sidus-input_verify " + (vericodeDisable ? 'disabled' : ''),
    onClick: function onClick() {
      triggerGetVerify();
    }
  }, status === VERIFY_REQUEST.REQUEST ? intval + "\u79D2" : '获取验证码') : ''));
};

exports["default"] = Input;