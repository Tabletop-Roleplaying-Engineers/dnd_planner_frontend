import React from 'react'
import styled from 'styled-components'
import { shadow, ShadowProps } from 'styled-system'
import * as R from 'ramda'
import { Badge, Avatar, Tooltip } from 'antd'
import { Flex, Box } from 'noui/Position'
import { Label } from 'ui/Text'
import UserInfo from 'components/UserInfo'
import { CLASSES } from 'components/ClassesSelector'

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

interface CharacterClassObject {
  name: string
  icon: string
}
const getIcon = R.prop('icon')
const defaultToEmptyObject = R.defaultTo({} as Record<'icon', string>)
const defaultToEmptyString = R.defaultTo('')
const getClassLogo: (className: string) => string = (name: string) =>
  R.pipe(
    R.find<CharacterClassObject>(R.propEq('name', name)),
    defaultToEmptyObject,
    getIcon,
    defaultToEmptyString,
  )((CLASSES as unknown) as CharacterClassObject[])

interface CharacterClassProps {
  charClass: string
  level: string
}
const CharacterClass: React.FC<CharacterClassProps> = ({
  charClass,
  level,
}) => {
  return (
    <Box key={charClass} m="10px">
      <Tooltip title={charClass}>
        <Badge count={level}>
          <Avatar size="small" src={getClassLogo(charClass)} />
        </Badge>
      </Tooltip>
    </Box>
  )
}

const parseClasses = (classesString: string) => {
  const classesStrings = classesString.split('&')

  return classesStrings.map((str) => str.split('=')) as [string, string][]
}

interface CharacterProps {
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
    parseClasses,
    R.map(([c, lvl]: [string, string]) => (
      <CharacterClass charClass={c} level={lvl} />
    )),
  )(dndClass)

  return (
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
            {!avatar && <Avatar size={40} icon="user" />}

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
  )
}
Character.displayName = 'Character'

export default Character
