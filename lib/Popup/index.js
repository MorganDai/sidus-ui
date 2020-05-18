"use strict";

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var ReactDOM = require("react-dom");

var classNames_1 = require("../utils/classNames");

require("./index.css");

var genEle = function genEle(config) {
  var _a = config.show,
      show = _a === void 0 ? false : _a,
      _b = config.children,
      children = _b === void 0 ? [React.createElement("div", null, "Should Be Content Here!")] : _b,
      _c = config.noContentCls,
      noContentCls = _c === void 0 ? false : _c,
      bg = config.bg;
  return React.createElement('div', {
    className: classNames_1.genClassName('popup_wrapper'),
    style: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: bg,
      top: 0,
      left: 0,
      zIndex: 1024,
      display: show ? 'block' : 'none'
    }
  }, React.createElement("div", {
    className: classNames_1.genClassName('popup_box') + (noContentCls ? ' no-content ' : '') + ' bdr-px-10'
  }, __spreadArrays(children.map(function (item, index) {
    var cls = index ? classNames_1.genClassName('popup_content' + (noContentCls ? '' : ' bg-fff')) : classNames_1.genClassName('popup_title') + ' text-center';
    return item ? React.createElement("div", {
      key: "sidus-popup_" + index,
      className: cls
    }, item) : null;
  }))));
};

function Popup(props) {
  var _a = props.content,
      content = _a === void 0 ? React.createElement("div", null, "Should Be Content Here!") : _a,
      _b = props.title,
      title = _b === void 0 ? null : _b,
      _c = props.bg,
      bg = _c === void 0 ? 'rgba(153, 153, 153, .6)' : _c,
      _d = props.noContentCls,
      noContentCls = _d === void 0 ? false : _d,
      _e = props.isLoading,
      isLoading = _e === void 0 ? false : _e,
      _f = props.cls,
      cls = _f === void 0 ? '' : _f;
  var loadingPop = isLoading;
  var wrapper = document.createElement('div'); // const element = genEle({ show: false, children: [title, content], bg });

  wrapper.id = classNames_1.genClassName('popup_wrapper' + Math.floor(Math.random() * 1000000));
  wrapper.className += " " + cls; // ReactDOM.render(element, wrapper);
  // document.documentElement.appendChild(wrapper);

  return {
    show: function show() {
      // 检查wrapper是否绑定在document上
      if (document.documentElement.contains(wrapper) && !isLoading) {
        document.documentElement.removeChild(wrapper);
      }

      if (loadingPop && document.documentElement.contains(wrapper)) {
        return;
      }

      ReactDOM.render(genEle({
        show: true,
        children: [title, content],
        bg: bg,
        noContentCls: noContentCls
      }), wrapper);
      document.documentElement.appendChild(wrapper);
      loadingPop = true;
    },
    close: function close() {
      if (document.documentElement.contains(wrapper)) {
        // hack 方法解决连续打开弹窗 闪烁的问题
        setImmediate(function () {
          document.documentElement.removeChild(wrapper);
        });
      }
    }
  };
}

exports["default"] = Popup;