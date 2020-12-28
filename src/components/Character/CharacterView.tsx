import React from 'react'
import * as R from 'ramda'
import { Col, Row, Tooltip } from 'antd'
import { Box, Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import { convertClassesStringToArray } from 'utils/common'
import { Character } from 'types/character'
import { CornerMenu } from 'components/CornerMenu'
import UserInfo from 'components/UserInfo'
import { CharacterClass } from './CharacterClass'
import styled from 'styled-components'

const CharacterAvatar = styled.img`
  width: 100%;
  margin-top: 10px;
`

const CharacterName = styled(Msg)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface ICharacterAvatarContainerProps {
  avatar: string
}
const CharacterAvatarContainer: React.FC<ICharacterAvatarContainerProps> = ({
  avatar,
}) => {
  return <CharacterAvatar src={avatar} alt="avatar" />
}

const getClassElements = R.pipe(
  convertClassesStringToArray,
  R.map(([c, lvl]: [string, string]) => (
    <CharacterClass key={c} charClass={c} level={lvl} m="10px" />
  )),
)

// TODO: access for menu
interface IProps {
  character: Character
}
export const CharacterView: React.FC<IProps> = (props) => {
  const { character } = props
  const { name, avatar, faction, user } = character
  const classesElements = getClassElements(character.class)

  return (
    <Box pt="10px" maxWidth="768px" margin="auto">
      {/* <Row gutter={[16, 16]}> */}
      <Row>
        <Col span={0} md={12}>
          {/* Avatar md - xxl */}
          <CharacterAvatarContainer avatar={avatar} />
        </Col>

        <Col span={24} md={12}>
          <Row>
            <Col span={24}>
              {/* Name */}
              {/* TODO: implement menu items */}
              <CornerMenu items={[]}>
                <Flex pr="35px">
                  {faction && (
                    <Tooltip title={faction.name}>
                      <img src={faction.logo} alt="faction" />
                    </Tooltip>
                  )}
                  <Box ml="12px" fontSize="14px" minWidth="0">
                    <CharacterName fontWeight="bold" fontSize="18px">
                      {name}
                    </CharacterName>
                  </Box>
                </Flex>
              </CornerMenu>
            </Col>
            <Col span={24} md={0}>
              {/* Avatar sx - sm */}
              <CharacterAvatarContainer avatar={avatar} />
            </Col>
            <Col span={24}>
              <Flex justifyContent="space-between" mt="10px">
                {/* Classes */}
                <Flex alignItems="center" overflow="auto" pr="10px">
                  {classesElements}
                </Flex>

                {/* User */}
                <UserInfo {...user} position="left" />

                {/* Notes */}
                {/* TBD */}
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
    </Box>
  )
}
