import React, { useCallback, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { noop } from 'utils/common'

interface Props {
  value?: string
  placeholder?: string
  onChange?: (v: string) => void
}
export const Editor = ({ value, onChange = noop, placeholder }: Props) => {
  const [valueInternal, setValueInternal] = useState(value || '')
  const change = useCallback(
    (v: string) => {
      setValueInternal(v)
      onChange(v)
    },
    [onChange],
  )

  useEffect(() => {
    setValueInternal(value || '')
  }, [value])

  return (
    <ReactQuill
      theme="snow"
      value={valueInternal}
      onChange={change}
      placeholder={placeholder}
    />
  )
}
