"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../utils/classNames");

require("./index.css");

var VERIFY_REQUEST;

(function (VERIFY_REQUEST) {
  VERIFY_REQUEST[VERIFY_REQUEST["NONE"] = 0] = "NONE";
  VERIFY_REQUEST[VERIFY_REQUEST["REQUEST"] = 1] = "REQUEST";
  VERIFY_REQUEST[VERIFY_REQUEST["FINISHED"] = 2] = "FINISHED";
})(VERIFY_REQUEST || (VERIFY_REQUEST = {}));

var Input = function Input(props) {
  var _a = props.align,
      align = _a === void 0 ? 'vertical' : _a,
      _b = props.autocomplete,
      autocomplete = _b === void 0 ? false : _b,
      _c = props.cls,
      cls = _c === void 0 ? '' : _c,
      _d = props.disabled,
      disabled = _d === void 0 ? false : _d,
      _e = props.disabledGetCode,
      disabledGetCode = _e === void 0 ? true : _e,
      _f = props.label,
      label = _f === void 0 ? '' : _f,
      _g = props.type,
      type = _g === void 0 ? 'text' : _g,
      _h = props.required,
      required = _h === void 0 ? false : _h,
      _j = props.value,
      value = _j === void 0 ? '' : _j,
      _k = props.verifyCodeInterval,
      verifyCodeInterval = _k === void 0 ? 60 : _k,
      _l = props.change,
      change = _l === void 0 ? function () {} : _l,
      _m = props.getVeriCodeCallback,
      getVeriCodeCallback = _m === void 0 ? function () {} : _m,
      _o = props.sendVeriCodeFinished,
      sendVeriCodeFinished = _o === void 0 ? function () {} : _o;

  var _p = React.useState(value),
      inputs = _p[0],
      setInputs = _p[1];

  var _q = React.useState(props.animation || false),
      focused = _q[0],
      setFocused = _q[1];

  var _r = React.useState(VERIFY_REQUEST.NONE),
      status = _r[0],
      setStatus = _r[1];

  var _s = React.useState(verifyCodeInterval),
      intval = _s[0],
      setIntval = _s[1];

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
    return __awaiter(void 0, void 0, void 0, function () {
      var shouldSend;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (disabledGetCode) return [2
            /*return*/
            ];
            return [4
            /*yield*/
            , getVeriCodeCallback()];

          case 1:
            shouldSend = _a.sent();

            if (!shouldSend) {
              return [2
              /*return*/
              ];
            }

            setStatus(VERIFY_REQUEST.REQUEST);
            setIntval(verifyCodeInterval);
            countDown();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var countDown = React.useCallback(function () {
    if (intval === 0) {
      clearInterval(timer.current);
      return;
    }

    setIntval(+intval - 1);
  }, [intval]);

  var triggerChange = function triggerChange(e) {
    return setInputs(e.target.value);
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
        setIntval(60);
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
    autoComplete: autocomplete ? 'on' : 'off',
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