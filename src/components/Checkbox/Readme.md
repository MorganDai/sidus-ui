## 基础用法
```jsx
<Checkbox icon='x' activeIcon='X' content={'我是内容'} />
```

## CheckboxGroup

```jsx
import Checkbox from './index';
import CheckboxGroup from './CheckboxGroup';

const data = [{
  label: '11111111111111',
  value: 1
}, {
  label: '222222222222222',
  value: 2
}];

<CheckboxGroup disabledValues={[1]} activeValues={[2]}>
  {
    data.map(item => (
      <Checkbox key={item.value} align='horizontal' content={item.label} value={item.value} />    
    )) 
  }    
</CheckboxGroup>
```
