import React from 'react'
import { Col, Card } from 'antd'
import Character from 'components/Character'

export const ParticipantsList = ({ characters }) => {
  return characters.map(character => (
      <Col md={12} key={character.id}>
        <Card size="small" bordered={false}>
          <Character {...character} />
        </Card>
      </Col>
  ))
}

