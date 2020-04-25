## 基础用法
```jsx
import { Form, FormStore } from './index'

store = new FormStore()

onSubmit = (e) => {
e.preventDefault()

const values = store.get()
    console.log(values)
}


<div>
    <Form store={store}>
        <Form.Field label='Name' name='name'>
            <input type='text' placeholder="电子邮箱" values="" />
        </Form.Field>
        <Form.Field label=''>
            <button onClick={onSubmit}>Submit</button>
        </Form.Field>
    </Form>
</div>
```