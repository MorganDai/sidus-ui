import * as React from 'react';
import Icon from '../Icon/index';
import './index.scss';

interface options {
  label: string;
  value: any;
}

interface SelectProps {
  defaults?: Array<number>;
  disabled?: boolean;
  data: Array<options>;
  multi?: boolean;
  onSelected?: Function;
}

const Select = (props: SelectProps) => {
  const { multi = false, data = [], disabled = false, onSelected, defaults = [] } = {
    ...props
  };

  const [activeIndexs, setActiveIndexs] = React.useState([...defaults]);
  const [collapse, setCollapse] = React.useState(true);
  const [showText, setShowText] = React.useState('');
  const [hasSelected, setHasSelected] = React.useState(!!defaults.length);

  const select = (value, e) => {
    // 阻止与document的事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    let temp:Array<any> = [];
    let i = -1;

    if (!multi) {
      temp = [value];
      setCollapse(!collapse);
    } else {
      setCollapse(false);
      temp = [...activeIndexs];
      i = temp.indexOf(value);
      if (i === -1) {
        temp.push(value);
      } else {
        temp.splice(i, 1);
      }
    }

    const tempFilter = data.filter(item => temp.indexOf(item.value) !== -1);

    setHasSelected(!!tempFilter.length);
    setShowText(tempFilter.map(item => item.label).join('/'));
    setActiveIndexs(temp);
  };

  const changeCollapse = React.useCallback(() => {
    if (disabled) {
      return;
    }

    if (!collapse) {
      setCollapse(!collapse);
    }
  }, [collapse, disabled]);

  React.useEffect(() => {
    document.addEventListener('click', changeCollapse);

    return function () {
      document.removeEventListener('click', changeCollapse);
    };
  }, [changeCollapse]);

  React.useEffect(() => {
    const filterData = data.filter(item => activeIndexs.indexOf(item.value) !== -1);
    onSelected && onSelected(filterData);
  }, [activeIndexs]);

  React.useEffect(() => {
    if (defaults.length !== 0) {
      setShowText(
        data
          .filter(it => defaults.some(item => item === it.value))
          .map(it => it.label)
          .join('/')
      );
    }
  }, [defaults]);

  const renderList = (info, idxs) => {
    const listItem = info.map((item, index) => (
      <li
        key={`sidus-select_${index}`}
        className={`sidus-select_item ${idxs.indexOf(item.value) !== -1 ? 'active' : ''}`}
        onClick={e => {
          !disabled && select(item.value, e);
        }}
      >
        {item.label}
      </li>
    ));
    return listItem;
  };

  const list = renderList(data, activeIndexs);

  return (
    <div className="sidus-select_wrapper">
      <div className="sidus-select_box">
        <div
          className="sidus-select"
          onClick={() => {
            !disabled && setCollapse(!collapse);
          }}
        >
          <span
            className={`sidus-select_placeholder one-line ${
              hasSelected ? 'selected' : ''
            }`}
          >
            {hasSelected ? showText : ''}
          </span>
          <Icon name="dropdown" cls="pos-r z-1" />
        </div>

        <div className={`sidus-select_list ${collapse ? '' : 'no-collapse'}`}>
          <ul>{list}</ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
