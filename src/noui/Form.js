import React from 'react'
import { Form } from 'antd'
import validate from 'validate.js'
import * as R from 'ramda'

const FormContext = React.createContext('formContext')
const _Form = ({ children, form, validation = {}, onSubmit, ...props }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        form.validateFields(async (err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values)
            await onSubmit(values, form)
          }
        })
      }}
      {...props}
    >
      <FormContext.Provider value={{ form, validation }}>
        {children({
          form: {
            hasErrors: () =>
              !R.pipe(R.reject(R.isNil), R.isEmpty)(form.getFieldsError()),
            ...form,
          },
        })}
      </FormContext.Provider>
    </Form>
  )
}

export const Field = ({ children, name, initialValue }) => (
  <FormContext.Consumer>
    {({ form, validation }) => {
      return (
        <Form.Item>
          {form.getFieldDecorator(name, {
            initialValue,
            rules: [
              {
                validator: async (r, v, cb) => {
                  if (!r.field) return cb()

                  try {
                    await validate.async(
                      { [r.field]: v },
                      { [r.field]: validation[r.field] },
                      { fullMessages: false },
                    )
                    cb()

                    return
                  } catch (error) {
                    return R.pipe(
                      R.propOr([], r.field),
                      (res) =>
                        !R.isEmpty(res) ? R.join(', ', res) : undefined,
                      cb,
                    )(error)
                  }
                },
              },
            ],
          })(children)}
        </Form.Item>
      )
    }}
  </FormContext.Consumer>
)

export default Form.create()(_Form)
