import React from 'react'
import { Form } from 'antd'

const FormContext = React.createContext('formContext')
const _Form = ({ children, form, onSubmit, ...props }) =>
  <Form
    onSubmit={e => {
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          onSubmit(values)
        }
      })
    }}
    {...props}
  >
    <FormContext.Provider value={form}>
      {children({ form })}
    </FormContext.Provider>
  </Form>

export const Field = ({ children, name, initialValue, ...props }) =>
  <FormContext.Consumer>
    {form => {
      return <Form.Item>
        {form.getFieldDecorator(name, {
          initialValue
        })(children)}
      </Form.Item>
    }
    }
  </FormContext.Consumer>

export default Form.create()(_Form)
