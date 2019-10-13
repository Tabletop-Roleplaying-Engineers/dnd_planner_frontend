import React from 'react'
import { Col, Card, Avatar } from 'antd'
const { Meta } = Card


export const ParticipantsList = ({ characters }) => (
  characters.map(character => (
    <span key={character.id}>
        <Col span={12}>
          <Card size="small" bordered={false}>
            <Meta
              avatar={<Avatar size={54} src={character.user.avatar} />}
              title={character.name}
              description={`${character.user.firstName || ''} ${character.user.lastName || ''}`}
            />
          </Card>
        </Col>
    </span>
  ))
)
