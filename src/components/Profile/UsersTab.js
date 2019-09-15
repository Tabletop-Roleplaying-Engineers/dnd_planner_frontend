import React, { useState } from 'react'
import styled from 'styled-components'
import { Table, Spin, Alert, Input, Avatar } from 'antd'
import { useQuery } from '@apollo/react-hooks';
import { Flex } from 'noui/Position'
import { useDebounce } from 'utils/hooks'
import {
  FETCH_USERS_QUERY,
} from 'api'

const InputWrapper = styled.div`
  padding: 12px 0;
`

const getAvatarLetters = (user) => {
  let name = ''
  if (user.firstName) {
    name += user.firstName.slice(0, 1)
  }
  if (user.lastName) {
    name += user.lastName.slice(0, 1)
  }
  if (name.length === 0) {
    name = user.username.slice(0, 1)
  }
  return name
}

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (url, user) => <Avatar src={url}>{getAvatarLetters(user)}</Avatar>,
    width: 75,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
];

export const UsersTab = () => {
  const [username, setUsername] = useState('')
  const debouncedUsername = useDebounce(username, 300)
  const { loading, error, data, refetch } = useQuery(FETCH_USERS_QUERY, {
    variables: {
      username: debouncedUsername,
    },
  });

  if (loading && !data) {
    return <Spin />
  }
  if (error) {
    return <Alert message={error.message} type="error" />
  }
  const { users } = data

  const dataSource = users.map(user => ({
    ...user,
    key: user.id,
    name: `${user.firstName || ''} ${user.lastName || ''}`,
  }))

  return (
    <Flex column>
      <InputWrapper>
        <Input
          value={username}
          placeholder="Enter username to search"
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputWrapper>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </Flex>
  )
}
