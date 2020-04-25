import * as React from 'react'

import FormStoreContext from './FormStoreContext'
import useFieldChange from './useFieldChange'
import FormOptionsContext, { FormOptions } from './FormOptionsContext'
import { getPropName, getValueFromEvent } from './utils/index'

export interface Props extends FormOptions {
  className?: string;
  label?: string;
  name?: string;
  hideErrors?: boolean;
  valueProp?: string | ((type: any) => string);
  valueGetter?: (...args: any[]) => any;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
}

export default function FormField (props: Props) {
  const {
    className,
    label,
    name,
    hideErrors = true,
    valueProp = 'value',
    valueGetter = getValueFromEvent,
    suffix,
    children,
    ...restProps
  } = props

  const store = React.useContext(FormStoreContext)
  const options = React.useContext(FormOptionsContext)
  const [value, setValue] = React.useState(name && store ? store.get(name) : undefined)
  const [error, setError] = React.useState(name && store ? store.error(name) : undefined)

  const onChange = React.useCallback(
    (...args: any[]) => name && store && store.set(name, valueGetter(...args)),
    [name, store, valueGetter]
  )

  useFieldChange(store, name, () => {
    setValue(store!.get(name!))
    setError(store!.error(name!))
  })

  let child: any = children

  if (name && store && React.isValidElement(child)) {
    const prop = getPropName(valueProp, child && child.type)
    const childProps = { [prop]: value, onChange }
    child = React.cloneElement(child, childProps)
  }

  const { inline, compact, required, labelWidth, gutter, errorClassName } = {
    ...options,
    ...restProps
  }

  const classNames = [
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
    error ? classes.error : '',
    className ? className : '',
    error ? errorClassName : ''
  ].join('')

  const headerStyle = {
    width: labelWidth,
    marginRight: gutter
  }

  return (
    <div className={classNames}>
      {label !== undefined && (
        <div className={classes.header} style={headerStyle}>
          {label}
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.control}>{child}</div>
        {
          hideErrors ? "" : <div className={classes.message}>{error}</div>
        }
      </div>
      {suffix !== undefined && <div className={classes.footer}>{suffix}</div>}
    </div>
  )
}

const classes = {
  field: 'sidus-form-field ',
  inline: 'sidus-form-field--inline ',
  compact: 'sidus-form-field--compact ',
  required: 'sidus-form-field--required ',
  error: 'sidus-form-field--error ',

  header: 'sidus-form-field__header',
  container: 'sidus-form-field__container',
  control: 'sidus-form-field__control',
  message: 'sidus-form-field__message',
  footer: 'sidus-form-field__footer'
}
