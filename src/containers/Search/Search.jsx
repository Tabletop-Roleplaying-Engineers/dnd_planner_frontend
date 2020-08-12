import React from 'react'
import { Tabs } from 'antd'
import { GamesSearchContainer } from './GamesSearch'
import { useIntl } from 'react-intl'

export const Search = () => {
  const intl = useIntl()

  return (
    <Tabs defaultActiveKey="games" type="card">
      <Tabs.TabPane
        tab={intl.formatMessage({ id: 'search.tabs.games' })}
        key="games"
      >
        <GamesSearchContainer />
      </Tabs.TabPane>
    </Tabs>
  )
}
