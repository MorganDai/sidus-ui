import * as React from 'react';

import { Menu } from '../src/components/index'

export default { title: 'Menu' };

export const common = () => (
  <Menu activeKey={[]}>
    <Menu.Item id="1" title="Hello"/>
    <Menu.SubMenu id="t"
             title={
               <h4>愚人节快乐~</h4>
             }
    >
      <Menu.Item id="1" title="左右手"/>
      <Menu.Item id="2" title="有心人"/>
      <Menu.Item id="3" title="啦啦啦"/>
      <Menu.Item id="4" title="哈哈哈"/>
      <Menu.Item id="5" title="boom"/>
    </Menu.SubMenu>

    <Menu.ItemGroup title="itemgroup">
      <Menu.Item id="6" title="o"/>
      <Menu.Item id="7" title="q"/>
      <Menu.Item id="8" title="w"/>
      <Menu.Item id="9" title="e"/>
      <Menu.Item id="10" title="r"/>
    </Menu.ItemGroup>
  </Menu>
)