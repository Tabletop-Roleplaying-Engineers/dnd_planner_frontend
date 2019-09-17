import React from 'react'
import { Button } from 'antd'
import { Flex } from 'noui/Position'
import { Msg } from 'ui/Text'

export const SettingsTab = (props) => {
  const { onLogOutClick } = props

  return (
    <Flex column width={['100%', '45%']}>
      <Msg>Rostyslav Melnychuk</Msg>

      <Msg>phone number</Msg>

      <Button
        onClick={onLogOutClick}
      >
        Sign out
      </Button>
    </Flex>
  )
}
