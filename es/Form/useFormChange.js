"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

function useFormChange(store, onChange) {
  React.useEffect(function () {
    if (!store) return;
    return store.subscribe(function (n) {
      onChange(n);
    });
  }, [store, onChange]);
}

exports["default"] = useFormChange;