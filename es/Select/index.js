"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArrays = this && this.__spreadArrays || function () {
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

var index_1 = require("../Icon/index");

require("./index.css");

var Select = function Select(props) {
  var _a = __assign({}, props),
      _b = _a.multi,
      multi = _b === void 0 ? false : _b,
      _c = _a.data,
      data = _c === void 0 ? [] : _c,
      _d = _a.disabled,
      disabled = _d === void 0 ? false : _d,
      onSelected = _a.onSelected,
      _e = _a.defaults,
      defaults = _e === void 0 ? [] : _e;

  var _f = React.useState(__spreadArrays(defaults)),
      activeIndexs = _f[0],
      setActiveIndexs = _f[1];

  var _g = React.useState(true),
      collapse = _g[0],
      setCollapse = _g[1];

  var _h = React.useState(''),
      showText = _h[0],
      setShowText = _h[1];

  var _j = React.useState(!!defaults.length),
      hasSelected = _j[0],
      setHasSelected = _j[1];

  var select = function select(value, e) {
    // 阻止与document的事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    var temp = [];
    var i = -1;

    if (!multi) {
      temp = [value];
      setCollapse(!collapse);
    } else {
      setCollapse(false);
      temp = __spreadArrays(activeIndexs);
      i = temp.indexOf(value);

      if (i === -1) {
        temp.push(value);
      } else {
        temp.splice(i, 1);
      }
    }

    var tempFilter = data.filter(function (item) {
      return temp.indexOf(item.value) !== -1;
    });
    setHasSelected(!!tempFilter.length);
    setShowText(tempFilter.map(function (item) {
      return item.label;
    }).join('/'));
    setActiveIndexs(temp);
  };

  var changeCollapse = React.useCallback(function () {
    if (disabled) {
      return;
    }

    if (!collapse) {
      setCollapse(!collapse);
    }
  }, [collapse, disabled]);
  React.useEffect(function () {
    document.addEventListener('click', changeCollapse);
    return function () {
      document.removeEventListener('click', changeCollapse);
    };
  }, [changeCollapse]);
  React.useEffect(function () {
    var filterData = data.filter(function (item) {
      return activeIndexs.indexOf(item.value) !== -1;
    });
    onSelected && onSelected(filterData);
  }, [activeIndexs]);
  React.useEffect(function () {
    if (defaults.length !== 0) {
      setShowText(data.filter(function (it) {
        return defaults.some(function (item) {
          return item === it.value;
        });
      }).map(function (it) {
        return it.label;
      }).join('/'));
    }
  }, [defaults]);

  var renderList = function renderList(info, idxs) {
    var listItem = info.map(function (item, index) {
      return React.createElement("li", {
        key: "sidus-select_" + index,
        className: "sidus-select_item " + (idxs.indexOf(item.value) !== -1 ? 'active' : ''),
        onClick: function onClick(e) {
          !disabled && select(item.value, e);
        }
      }, item.label);
    });
    return listItem;
  };

  var list = renderList(data, activeIndexs);
  return React.createElement("div", {
    className: "sidus-select_wrapper"
  }, React.createElement("div", {
    className: "sidus-select_box"
  }, React.createElement("div", {
    className: "sidus-select",
    onClick: function onClick() {
      !disabled && setCollapse(!collapse);
    }
  }, React.createElement("span", {
    className: "sidus-select_placeholder one-line " + (hasSelected ? 'selected' : '')
  }, hasSelected ? showText : ''), React.createElement(index_1["default"], {
    name: "dropdown",
    cls: "pos-r z-1"
  })), React.createElement("ul", {
    className: "sidus-select_list " + (collapse ? '' : 'no-collapse')
  }, list)));
};

exports["default"] = Select;