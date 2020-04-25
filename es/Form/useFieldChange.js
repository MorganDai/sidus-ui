"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

function useFieldChange(store, name, onChange) {
  React.useEffect(function () {
    if (!name || !store) return;
    return store.subscribe(function (n) {
      if (name === '*' || n === name || n === '*') {
        onChange(name);
      }
    });
  }, [name, store, onChange]);
}

exports["default"] = useFieldChange;