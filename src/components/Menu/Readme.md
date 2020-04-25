## 基础用法
```jsx
import MenuItem from "./MenuItem.tsx";
import SubMenu from "./SubMenu.tsx";
import ItemGroup from "./MenuItemGroup";

const defaultKeys = ["t", "5"];

<Menu activeKey={defaultKeys}>
    <MenuItem id="1" title="Hello"></MenuItem>
    <SubMenu id="t"
        title={
            <h4>愚人节快乐~</h4>
        }
    >
        <MenuItem id="1" title="左右手"></MenuItem>
        <MenuItem id="2" title="有心人"></MenuItem>
        <MenuItem id="3" title="啦啦啦"></MenuItem>
        <MenuItem id="4" title="哈哈哈"></MenuItem>
        <MenuItem id="5" title="boom"></MenuItem>
    </SubMenu>

    <ItemGroup title="itemgroup">
        <MenuItem id="6" title="o"></MenuItem>
        <MenuItem id="7" title="q"></MenuItem>
        <MenuItem id="8" title="w"></MenuItem>
        <MenuItem id="9" title="e"></MenuItem>
        <MenuItem id="10" title="r"></MenuItem>
    </ItemGroup>
</Menu>
```
