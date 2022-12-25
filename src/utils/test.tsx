import React from 'react'
import { IntlProvider } from 'react-intl'
import { messages } from 'intl/messagesEn'

export function assertElementExist(el: HTMLElement | null): asserts el {
  if (el === null) {
    throw new Error('Element is `null`')
  }
}

export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <IntlProvider messages={messages} locale="en">
      {children}
    </IntlProvider>
  )
}
