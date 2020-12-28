import React from 'react'
import { useParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Alert, Spin } from 'antd'
import { FETCH_CHARACTER_QUERY } from 'api/characters'
import { Character } from 'types/character'
import { CharacterView } from 'components/Character/CharacterView'
import { Box, Flex } from 'noui/Position'

export const PageContainer = styled(Box)`
  margin: auto;
  margin-top: 10px;
  @media (min-width: 768px) {
    width: 100%;
  }
`
interface CharacterResponse {
  character: Character | null
}
export const CharacterPage = () => {
  let { id } = useParams<{ id: string }>()
  const { data, loading } = useQuery<CharacterResponse>(FETCH_CHARACTER_QUERY, {
    variables: { id },
  })

  if (loading) {
    return (
      <Flex justifyContent="center" mt="10px">
        <Spin />
      </Flex>
    )
  }

  if (!data?.character) {
    return (
      <PageContainer>
        <Alert
          message={<FormattedMessage id="character.404" />}
          type="error"
          showIcon
        />
      </PageContainer>
    )
  }

  return <CharacterView character={data.character} />
}
