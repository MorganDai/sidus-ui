## 基础用法
```jsx

<Collapse activeKey={["2"]}>
    <Collapse.Panel
        id="1"
        header={
            <div>
                <p id="trigger-icon">This is panel header1</p>
                <h3>不触发展开</h3>
            </div>
        }
        triggerId="trigger-icon"
    >
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </Collapse.Panel>
    <Collapse.Panel
        id="2"
        header={<p>This is panel header2</p>}
    >
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </Collapse.Panel>
</Collapse>
```