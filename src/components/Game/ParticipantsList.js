import React from 'react'
import { Row, Col, Card } from 'antd'
import Character from 'components/Character'

export const ParticipantsList = ({ characters }) => {
  return characters.map(character => (
    <Row key={character.id}>
      <Col md={12}>
        <Card size="small" bordered={false}>
          <Character {...character} />
        </Card>
      </Col>
    </Row>
  ))
}

