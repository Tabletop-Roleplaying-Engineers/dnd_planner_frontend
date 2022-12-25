import React from 'react'
import { Tabs, Spin, Alert, List } from 'antd'
import { useQuery } from '@apollo/client'

import { FETCH_RULES } from 'api'
import { useScreenMedia } from 'noui/MediaQuery'

import { Box } from 'noui/Position'
import { Header } from 'ui/Text'

function Rules() {
  const rulesQuery = useQuery(FETCH_RULES)
  const media = useScreenMedia()
  const _isMobile = media.isMobile

  if (rulesQuery.loading) {
    return <Spin />
  }

  if (rulesQuery.error) {
    return <Alert message={rulesQuery.error.message} type="error" />
  }

  const { rules } = rulesQuery.data

  return (
    <Box>
      <Tabs type="card" tabPosition={_isMobile ? 'top' : 'left'}>
        {rules.map((rule) => (
          <Tabs.TabPane tab={rule.title} key={rule.title}>
            <Box my={10}>
              <Header>{rule.title}</Header>
            </Box>

            <List
              size="large"
              bordered
              dataSource={rule.rules}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Box>
  )
}

export default Rules
