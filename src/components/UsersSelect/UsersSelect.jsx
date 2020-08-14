import React, { useState, useCallback } from 'react'
import { Avatar, Select } from 'antd'
import styled from 'styled-components'
import { Flex, Box } from 'noui/Position'
import { getAvatarLetters, getUserName } from 'utils/common'
import { useDictionary } from 'utils/hooks'
import { useIntl, FormattedMessage } from 'react-intl'

const StyledSelect = styled(Select)`
  width: 100%;
`

export const UsersSelect = ({
  users = [],
  onChange = () => {},
  withEmpty = false,
}) => {
  const intl = useIntl()
  const usersById = useDictionary(users)
  const [selected, setSelected] = useState(null)
  const onSelect = useCallback(
    id => {
      setSelected(id)
      onChange(usersById[id])
    },
    [usersById, onChange],
  )

  return (
    <StyledSelect
      placeholder={intl.formatMessage({ id: 'search.userInput.placeholder' })}
      selected={selected}
      onSelect={onSelect}
    >
      {withEmpty && (
        <StyledSelect.Option value={null}>
          <Flex alignItems="center">
            <FormattedMessage id="userSelect.all" />
          </Flex>
        </StyledSelect.Option>
      )}
      {users.map(item => (
        <StyledSelect.Option key={item.id} value={item.id}>
          <Flex alignItems="center">
            <Avatar size="small" src={item.avatar}>
              {getAvatarLetters(item)}
            </Avatar>
            <Box ml="10px">{getUserName(item)}</Box>
          </Flex>
        </StyledSelect.Option>
      ))}
    </StyledSelect>
  )
}
