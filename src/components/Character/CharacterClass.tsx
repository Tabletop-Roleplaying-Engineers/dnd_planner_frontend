import React from 'react'
import * as R from 'ramda'
import { Avatar, Badge, Tooltip } from 'antd'
import { Box, BoxProps } from 'noui/Position'
import { CLASSES } from 'components/ClassesSelector'

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

interface CharacterClassProps extends BoxProps {
  charClass: string
  level: string
}
export const CharacterClass: React.FC<CharacterClassProps> = ({
  charClass,
  level,
  ...rest
}) => {
  return (
    <Box key={charClass} {...rest}>
      <Tooltip title={charClass}>
        <Badge count={level}>
          <Avatar size="small" src={getClassLogo(charClass.toLowerCase())} />
        </Badge>
      </Tooltip>
    </Box>
  )
}
