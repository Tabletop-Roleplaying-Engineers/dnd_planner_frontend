import React, { useCallback, useContext } from 'react'
import * as R from 'ramda'
import { Col, Row, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Box, Flex } from 'noui/Position'
import { Msg } from 'ui/Text'
import { convertClassesStringToArray } from 'utils/common'
import { Character } from 'types/character'
import { CornerMenu } from 'components/CornerMenu'
import UserInfo from 'components/UserInfo'
import { CharacterClass } from './CharacterClass'
import { useCharacterActions } from 'utils/hooks/useCharacterActions'
import { UserContext } from 'context/userContext'

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

const Notes = styled.div`
  word-break: break-word;
`

const FactionImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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

interface IProps {
  character: Character
}
export const CharacterView: React.FC<IProps> = (props) => {
  const { character } = props
  const { name, avatar, faction, user, notes } = character
  const classesElements = getClassElements(character.class)
  const navigate = useNavigate()
  const intl = useIntl()
  const { user: currentUser } = useContext(UserContext)
  const onDeleteSuccess = useCallback(() => navigate('/'), [navigate])
  const { deleteDialog, editDialog, deleteCharacter, editCharacter } =
    useCharacterActions({
      onDeleteSuccess,
    })

  return (
    <Box pt="10px" maxWidth="768px" margin="auto">
      <Row gutter={16}>
        <Col span={0} md={12}>
          {/* Avatar for md - xxl */}
          <CharacterAvatarContainer avatar={avatar} />
        </Col>

        <Col span={24} md={12}>
          <Row>
            <Col span={24}>
              {/* Name */}
              <CornerMenu
                hide={currentUser?.id !== user.id}
                items={[
                  {
                    label: intl.formatMessage({ id: 'common.edit' }),
                    icon: <EditOutlined />,
                    onClick: () => editCharacter(character),
                    'data-testid': 'character-menu-edit',
                  },
                  {
                    label: intl.formatMessage({ id: 'common.delete' }),
                    icon: <DeleteOutlined />,
                    onClick: async () => deleteCharacter(character),
                    'data-testid': 'character-menu-delete',
                  },
                ]}
              >
                <Flex pr="35px">
                  {faction && (
                    <Tooltip title={faction.name}>
                      <Flex height="24px" width="24px">
                        <FactionImg src={faction.logo} alt="faction" />
                      </Flex>
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
              {/* Avatar for sx - sm */}
              <CharacterAvatarContainer avatar={avatar} />
            </Col>
            <Col span={24}>
              <Row>
                <Flex flexDirection="column">
                  <Flex justifyContent="space-between" mt="10px">
                    {/* Classes */}
                    <Flex alignItems="center" overflow="auto" pr="10px">
                      {classesElements}
                    </Flex>

                    {/* User */}
                    <UserInfo {...user} position="left" />
                  </Flex>

                  {/* Notes */}
                  <Notes dangerouslySetInnerHTML={{ __html: notes }} />
                </Flex>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {deleteDialog}
      {editDialog}
    </Box>
  )
}
