import React from 'react'
import { Flex, Box } from 'noui/Position'
import { Msg, Label } from 'ui/Text'
import styled from 'styled-components'
import UserInfo from 'components/UserInfo'
import { background } from 'styled-system'
import { CLASSES } from 'components/ClassesSelector'
import qs from 'query-string'
import * as R from 'ramda'
import { Badge, Avatar, Tooltip, Tag } from 'antd'

const Wrapper = styled(Flex)`
  ${background}
`

const StyledImage = styled.img`
  height: 60px;
  width: 60px;
  object-fit: contain;
`

const StyledFactionLogo = styled.img`
  height: 25px;
  width: 25px;
  object-fit: contain;
  position: absolute;
  right: -10px;
  top: -10px;
`

const getClassLogo = name => R.pipe(
  R.find(R.propEq('name', name)),
  R.propOr("", "icon")
)(CLASSES)

const Character = ({ 
  name, 
  class: dndClass, 
  avatar, 
  experience,
  renown, 
  faction: { name: fname, logo }, 
  user,
  ...props 
}) => {
  
  return (
    <Wrapper center {...props} inline background>
      <Box position="relative">
        {avatar && <StyledImage src={avatar} />}
        
        <Tooltip title={fname}>
          {logo && <StyledFactionLogo src={logo} />}
        </Tooltip>
      </Box>

      <Flex ml={10} py="5px" column justifyContent="space-between">
        <Box mb={10}>
          <Label>{name}</Label>
        </Box>

        <Flex>
          {
            R.pipe(
              R.toPairs,
              R.map(([c, lvl]) =>    
              <Box key={c} mx="5px">
                <Tooltip title={c}> 
                  <Badge 
                    count={lvl}
                  >
                    <Avatar 
                      size="small"
                      src={getClassLogo(c)}
                    />
                  </Badge>
                </Tooltip>
              </Box>),
            )(qs.parse(dndClass))
          }
        </Flex>
      </Flex>

      <Flex ml={15} column center>
        <UserInfo {...user} position="left"/>
      </Flex>
    </Wrapper>
  )
}

export default Character
