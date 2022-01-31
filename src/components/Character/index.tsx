import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { shadow, ShadowProps } from 'styled-system'
import * as R from 'ramda'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { Flex, Box } from 'noui/Position'
import { Label } from 'ui/Text'
import UserInfo from 'components/UserInfo'
import { convertClassesStringToArray } from 'utils/common'
import { CharacterClass } from './CharacterClass'

const Wrapper = styled<typeof Flex & ShadowProps>(Flex)`
  ${shadow}
`

const StyledImage = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
`

const AvatarPlaceholder = styled.img`
  height: 60px;
  width: 60px;
  background: rgb(204, 204, 204);
  border-radius: 50%;
`
AvatarPlaceholder.displayName = 'AvatarPlaceholder'

const CharacterName = styled(Label)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const StyledFactionLogo = styled.img`
  height: 25px;
  width: 25px;
  object-fit: contain;
  position: absolute;
  right: -10px;
  top: -10px;
`

const StyledUserInfo = styled(UserInfo)`
  align-self: center;
`

interface CharacterProps {
  id: string
  name: string
  class: string
  avatar: string
  experience: string
  renown: string
  faction: {
    name: string
    logo: string
  }
  user: any
  withBorder?: boolean
}
const Character: React.FC<CharacterProps> = ({
  id,
  name,
  class: dndClass,
  avatar,
  experience,
  renown,
  faction: { name: fname, logo },
  user,
  withBorder = false,
  ...props
}) => {
  const classesElements = R.pipe(
    convertClassesStringToArray,
    R.map(([c, lvl]: [string, string]) => (
      <CharacterClass key={c} charClass={c} level={lvl} m="10px" />
    )),
  )(dndClass)

  return (
    <Link to={`/character/${id}`}>
      <Wrapper
        {...props}
        flexDirection="column"
        width="100%"
        boxShadow={withBorder ? '1px 2px 4px 2px rgba(0, 0, 0, 0.25)' : 'none'}
        p="10px"
      >
        {/* Name */}
        <Box pr="40px">
          <CharacterName textAlign="left" title={name}>
            {name}
          </CharacterName>
        </Box>

        <Flex justifyContent="space-between" mt="10px">
          <Flex alignItems="center" minWidth="0">
            {/* Character avatar */}
            <Box position="relative">
              {avatar && <StyledImage src={avatar} />}
              {!avatar && <Avatar size={40} icon={<UserOutlined />} />}

              <Tooltip title={fname}>
                {logo && <StyledFactionLogo src={logo} />}
              </Tooltip>
            </Box>

            {/* Classes */}
            <Flex alignItems="center" overflow="auto" pr="10px">
              {classesElements}
            </Flex>
          </Flex>

          <StyledUserInfo {...user} position="left" />
        </Flex>
      </Wrapper>
    </Link>
  )
}
Character.displayName = 'Character'

export default Character
