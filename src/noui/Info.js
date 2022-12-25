import React from 'react'
import { SmileOutlined } from '@ant-design/icons'
import { notification } from 'antd'

export const weAreWorking = () =>
  notification.open({
    message: 'Дана секція недоступна.',
    description: 'Шпигуни працюють, аби зібрати інформацію',
    icon: <SmileOutlined style={{ color: '#E40712' }} />,
  })
