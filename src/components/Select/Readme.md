## 基础用法
```jsx
const data = [
    {
        label: "Apture",
        value: 0
    },
    {
        label: "Deity",
        value: 1
    },
    {
        label: "IPOT",
        value: 2
    },
    {
        label: "Others",
        value: 3
    }
];

<div>
    <Select data={data}/>
</div>
```

## 多选
```jsx
const data = [
    {
        label: "Apture",
        value: 0
    },
    {
        label: "Deity",
        value: 1
    },
    {
        label: "IPOT",
        value: 2
    },
    {
        label: "Others",
        value: 3
    }
];

<div>
    <Select data={data} multi={true}/>
</div>
```
