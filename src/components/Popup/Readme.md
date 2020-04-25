## 基础用法

```jsx
const closeModal = () => {
    p.close();
}
const p = new Popup({
    title: <div>标题</div>,
    content: (<div>
         弹窗内容
         <button onClick={closeModal}>点击关闭弹窗</button>
     </div>)
});

<div onClick={p.show}>点击出现POPUP</div>
```