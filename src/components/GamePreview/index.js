import { Tag } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'noui/Position'
import { Header } from 'ui/Text'

const Wrapper = styled(Flex)`
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
`
const Title = styled(Box)`
  padding: 5px 10px;
`
const HeaderWithShadow = styled(Header)`
  text-shadow: 0px 0px 5px black;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`
const TagWrapper = styled.span`
  text-shadow: 0px 0px 5px #fff;
  margin-bottom: 5px;
  max-width: 100%;
`
const StyledTag = styled(Tag)`
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const GamePreview = ({ title, tags = [], ...props }) => {
  return (
    <Wrapper style={{ backgroundImage: `url(${props.image})` }} {...props}>
      <Title mb={10}>
        <HeaderWithShadow
          fontSize={16}
          fontWeight="bold"
          textAlign="center"
          lineHeight={1}
          color={props.image ? '#fff' : null}
          title={title}
        >
          {title}
        </HeaderWithShadow>
      </Title>

      <Flex justifyContent="space-between">
        <Flex
          row
          flexWrap="wrap"
          m={1}
          width="100%"
          maxHeight="95px"
          overflow="hidden"
        >
          {tags.map((tag, i) => (
            <TagWrapper key={tag + i}>
              <StyledTag title={tag}>{tag}</StyledTag>
            </TagWrapper>
          ))}
        </Flex>
      </Flex>
    </Wrapper>
  )
}
