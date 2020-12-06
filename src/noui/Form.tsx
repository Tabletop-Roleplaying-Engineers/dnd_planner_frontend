import React, { ReactNode, useCallback } from 'react'
import { Form } from 'antd'
import validate from 'validate.js'
import * as R from 'ramda'

interface FormContextValue {
  form: any
  validation: Record<string, any>
}
const FormContext = React.createContext<FormContextValue>({
  form: null,
  validation: {},
})

const filterOutEmpty = R.reject(R.isNil)
const isAllEmpty: (list: any[]) => boolean = R.pipe(filterOutEmpty, R.isEmpty)

interface FormChildrenArgument {
  form: any
}
interface Props {
  form: any
  validation: Record<string, any>
  onSubmit: (values: any, form: any) => void
  children: (props: FormChildrenArgument) => ReactNode
}
const _Form: React.FC<Props> = ({
  children,
  form,
  validation = {},
  onSubmit,
  ...props
}) => {
  const hasErrors = useCallback(() => !isAllEmpty(form.getFieldsError()), [
    form,
  ])

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        form.validateFields(async (err: Error, values: any) => {
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
            hasErrors,
            ...form,
          },
        })}
      </FormContext.Provider>
    </Form>
  )
}

interface FieldProps {
  name: string
  initialValue?: any
}
export const Field: React.FC<FieldProps> = ({
  children,
  name,
  initialValue,
}) => (
  <FormContext.Consumer>
    {({ form, validation }) => {
      return (
        <Form.Item>
          {form.getFieldDecorator(name, {
            initialValue,
            rules: [
              {
                validator: async (r: any, v: any, cb: () => void) => {
                  const extractErrors: (
                    errors: Record<string, string[] | undefined>,
                  ) => string[] = R.propOr<string[]>([], r.field)
                  const parseErrors = R.pipe(
                    extractErrors,
                    (res) => (!R.isEmpty(res) ? R.join(', ', res) : undefined),
                    // TODO: `R.tap`?
                    cb,
                  )

                  if (!r.field) return cb()

                  try {
                    await validate.async(
                      { [r.field]: v },
                      { [r.field]: validation[r.field] },
                      // { fullMessages: false },
                    )
                    cb()

                    return
                  } catch (error) {
                    return parseErrors(error)
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

export default Form.create<Props>()(_Form)
