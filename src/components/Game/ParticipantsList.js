import React from 'react'
import { Row, Col, Card } from 'antd'
import Character from 'components/Character'

export const ParticipantsList = ({ characters }) => {
  return characters.map(character => (
    <Row>
      <Col md={12} key={character.id}>
        <Card size="small" bordered={false}>
          <Character {...character} />
        </Card>
      </Col>
    </Row>
  ))
}

