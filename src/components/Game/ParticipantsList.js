import React from 'react'
import { Col, Card, Avatar } from 'antd'
import { isDesktop } from 'noui/MediaQuery'
const { Meta } = Card

export const ParticipantsList = ({ characters }) => {
  const _isDesktop = isDesktop()

  return characters.map(character => (
    <span key={character.id}>
        <Col span={_isDesktop ? 12 : 24}>
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
}

