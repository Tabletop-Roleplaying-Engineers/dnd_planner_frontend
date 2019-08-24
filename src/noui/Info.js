import React from 'react'
import { Icon, notification } from 'antd'

export const weAreWorking = () =>
  notification.open({
    message: 'Дана секція недоступна.',
    description: 'Шпигуни працюють, аби зібрати інформацію',
    icon: <Icon type="smile" style={{ color: '#E40712' }} />,
  })
