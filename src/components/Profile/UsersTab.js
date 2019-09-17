import React, { useState } from 'react'
import styled from 'styled-components'
import { Table, Spin, Alert, Input, Avatar, Tag, Modal, Icon, Select } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Flex } from 'noui/Position'
import { useDebounce } from 'utils/hooks'
import {
  FETCH_USERS_QUERY,
  UPDATE_USER_ROLES,
  FETCH_ROLES_QUERY,
} from 'api'

const { Option } = Select;
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

const RolesList = ({ userRoles, roles = [], user, onChange }) => {
  const [roleForDelete, setRoleForDelete] = useState(false)
  const [addRoleVisible, setAddRoleVisible] = useState(false)
  const [mutationInProgress, setMutationInProgress] = useState(false)
  const [error, setError] = useState(null)
  const [newRole, setNewRole] = useState(null)
  const [updateRolesMutation] = useMutation(UPDATE_USER_ROLES);
  const updateRoles = async (newRoles) => {
    setMutationInProgress(true)
    try {
      await updateRolesMutation({ variables: { userId: user.id, roles: newRoles } })
      onCancelClick()
      onChange()
    } catch (error) {
      setError(error)
    }
  }
  const deleteRole = async (roleToDelete) => {
    const newRoles = userRoles.map(role => role.id).filter(roleId => roleId !== roleToDelete.id)
    updateRoles(newRoles)
  }
  const addRole = async (roleIdToAdd) => {
    if (!newRole) {
      return
    }
    const newRoles = [
      ...(userRoles.map(role => role.id)),
      roleIdToAdd,
    ]
    updateRoles(newRoles)
  }
  const onDeleteRoleClick = (e, role) => {
    setRoleForDelete(role)
    e.preventDefault()
  }
  const onCancelClick = () => {
    setRoleForDelete(null)
    setError(null)
    setNewRole(null)
    setAddRoleVisible(false)
    setMutationInProgress(false)
  }

  return (
    <>
      {userRoles.map((role) => (
        <Tag key={role.id} closable onClose={(e) => onDeleteRoleClick(e, role)}>
          {role.name}
        </Tag>
      ))}
      <Tag onClick={() => setAddRoleVisible(true)} style={{ background: '#fff', borderStyle: 'dashed' }}>
        <Icon type="plus" /> New role
      </Tag>

      {/* Delete role modal */}
      <Modal
        title="Delete role"
        visible={!!roleForDelete}
        onOk={() => deleteRole(roleForDelete)}
        confirmLoading={mutationInProgress}
        onCancel={onCancelClick}
      >
        <p>Are you sure that you want to delete <b>{roleForDelete && roleForDelete.name}</b> role from <b>{user.username}</b>?</p>
        {error && <Alert message={error.message} type="error" />}
      </Modal >

      {/* Add role modal */}
      <Modal
        title="Add role"
        visible={addRoleVisible}
        onOk={() => addRole(newRole)}
        confirmLoading={mutationInProgress}
        onCancel={onCancelClick}
      >
        <p>Selected role will be added to <b>{user.username}</b></p>
        {error && <Alert message={error.message} type="error" />}
        <Select value={newRole} style={{ width: 120 }} onChange={setNewRole}>
          {roles.map(role => (
            <Option key={role.id} value={role.id}>{role.name}</Option>
          ))}
        </Select>
      </Modal >
    </>
  )
}

export const UsersTab = () => {
  const [username, setUsername] = useState('')
  const debouncedUsername = useDebounce(username, 300)
  const { loading, error, data, refetch } = useQuery(FETCH_USERS_QUERY, {
    variables: {
      username: debouncedUsername,
    },
  });
  const { loading: loadingRoles, error: errorRoles, data: rolesResponse } = useQuery(FETCH_ROLES_QUERY);
  const roles = rolesResponse ? rolesResponse.roles : []
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
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (userRoles, user) => <RolesList userRoles={userRoles} user={user} roles={roles} onChange={refetch} />,
    },
  ]

  if ((loading || loadingRoles) && !data) {
    return <Spin />
  }
  if (error) {
    return <Alert message={error.message} type="error" />
  }
  if (errorRoles) {
    return <Alert message={errorRoles.message} type="error" />
  }
  const { users } = data

  const dataSource = users.map(user => ({
    ...user,
    key: user.id,
    name: `${user.firstName || ''} ${user.lastName || ''}`,
  }))

  return (
    <>
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
    </>
  )
}