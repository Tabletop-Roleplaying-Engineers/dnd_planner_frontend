import React from 'react'
import { IntlProvider } from 'react-intl'
import { messages } from 'intl/messagesUa'

export function assertElementExist(el: HTMLElement | null): asserts el {
  if (el === null) {
    throw new Error('Element is `null`')
  }
}

export const TestWrapper: React.FC = ({ children }) => {
  return (
    <IntlProvider messages={messages} locale="uk">
      {children}
    </IntlProvider>
  )
}
