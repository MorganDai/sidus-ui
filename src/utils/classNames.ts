import { PREFIX } from "../constant/index";

const classNames = (...classes) => {
  return classes.filter(item => !!item).join(' ');
}

// 将数组、对象的className配置转化为string
const resolveClassName = (cls: (string|Array<string>|object)) => {
  if (cls === undefined) {
    return "";
  }

  let classes = "";
  if (typeof cls === "string") {
    classes = cls;
  } else if (cls instanceof Array) {
    classes = cls.join(" ");
  } else {
    classes = Object.keys(cls).filter(key => !!cls[key]).join(" ");
  }
  return classes;
}

const genClassName = (cls, prefix = PREFIX) => {
  return `${prefix}-${resolveClassName(cls)}`;
}

export  {
  classNames,
  resolveClassName,
  genClassName
}
