import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import {
  Table,
  Spin,
  Alert,
  Input,
  Avatar,
  Tag,
  Modal,
  Icon,
  Select,
  Dropdown,
  Menu,
} from 'antd'
import { useQuery, useMutation } from '@apollo/client'
import { Flex } from 'noui/Position'
import { useDebounce } from 'utils/hooks'
import { getAvatarLetters } from 'utils/common'
import {
  FETCH_USERS_QUERY,
  UPDATE_USER_ROLES,
  FETCH_ROLES_QUERY,
  SIGN_IN_ON_BEHALF_MUTATION,
} from 'api'
import { FormattedMessage, useIntl } from 'react-intl'

const { Option } = Select
const InputWrapper = styled.div`
  padding: 12px 0;
`

const RolesList = ({ userRoles, roles = [], user, onChange }) => {
  const [roleForDelete, setRoleForDelete] = useState(false)
  const [addRoleVisible, setAddRoleVisible] = useState(false)
  const [mutationInProgress, setMutationInProgress] = useState(false)
  const [error, setError] = useState(null)
  const [newRole, setNewRole] = useState(null)
  const [updateRolesMutation] = useMutation(UPDATE_USER_ROLES)
  const updateRoles = async (newRoles) => {
    setMutationInProgress(true)
    try {
      await updateRolesMutation({
        variables: { userId: user.id, roles: newRoles },
      })
      onCancelClick()
      onChange()
    } catch (error) {
      setError(error)
    }
  }
  const deleteRole = async (roleToDelete) => {
    const newRoles = userRoles
      .map((role) => role.id)
      .filter((roleId) => roleId !== roleToDelete.id)
    updateRoles(newRoles)
  }
  const addRole = async (roleIdToAdd) => {
    if (!newRole) {
      return
    }
    const newRoles = [...userRoles.map((role) => role.id), roleIdToAdd]
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
      <Tag
        onClick={() => setAddRoleVisible(true)}
        style={{ background: '#fff', borderStyle: 'dashed', cursor: 'pointer' }}
      >
        <Icon type="plus" /> <FormattedMessage id="users.role.addBtn.label" />
      </Tag>

      {/* Delete role modal */}
      <Modal
        title={<FormattedMessage id="users.role.removeDialog.title" />}
        visible={!!roleForDelete}
        onOk={() => deleteRole(roleForDelete)}
        okText={<FormattedMessage id="common.yes" />}
        cancelText={<FormattedMessage id="common.no" />}
        confirmLoading={mutationInProgress}
        onCancel={onCancelClick}
      >
        <p>
          <FormattedMessage
            id="users.role.removeDialog.content"
            values={{
              roleName: <b>{roleForDelete && roleForDelete.name}</b>,
              username: (
                <b>
                  {user.name
                    ? `${user.name} (${user.username})`
                    : user.username}
                </b>
              ),
            }}
          />
        </p>
        {error && <Alert message={error.message} type="error" />}
      </Modal>

      {/* Add role modal */}
      <Modal
        title={<FormattedMessage id="users.role.addDialog.title" />}
        visible={addRoleVisible}
        onOk={() => addRole(newRole)}
        confirmLoading={mutationInProgress}
        onCancel={onCancelClick}
        okText={<FormattedMessage id="common.yes" />}
        cancelText={<FormattedMessage id="common.no" />}
      >
        <p>
          <FormattedMessage
            id="users.role.addDialog.content"
            values={{
              username: (
                <b>
                  {user.name
                    ? `${user.name} (${user.username})`
                    : user.username}
                </b>
              ),
            }}
          />
        </p>
        {error && <Alert message={error.message} type="error" />}
        <Select value={newRole} style={{ width: 120 }} onChange={setNewRole}>
          {roles.map((role) => (
            <Option key={role.id} value={role.id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  )
}

const AvatarColumn = ({ url, user, setOnBehalfToken }) => {
  const [signInOnBehalfMutation, result] = useMutation(
    SIGN_IN_ON_BEHALF_MUTATION,
  )
  const signIn = useCallback(async () => {
    await signInOnBehalfMutation({
      variables: { userId: user.id },
    })
  }, [signInOnBehalfMutation, user])
  const userMenu = (
    <Menu>
      <Menu.Item onClick={signIn}>Sign in behalf this user</Menu.Item>
    </Menu>
  )

  useEffect(() => {
    if (result.data && result.data.signInOnBehalf) {
      setOnBehalfToken(result.data.signInOnBehalf)
    }
  }, [result, setOnBehalfToken])

  return (
    <Dropdown overlay={userMenu} trigger={['contextMenu']}>
      <Avatar src={url}>{getAvatarLetters(user)}</Avatar>
    </Dropdown>
  )
}

export const UsersTab = ({ setOnBehalfToken }) => {
  const intl = useIntl()
  const [username, setUsername] = useState('')
  const debouncedUsername = useDebounce(username, 300)
  const { loading, error, data, refetch } = useQuery(FETCH_USERS_QUERY, {
    variables: {
      username: debouncedUsername,
    },
  })
  const {
    loading: loadingRoles,
    error: errorRoles,
    data: rolesResponse,
  } = useQuery(FETCH_ROLES_QUERY)
  const roles = rolesResponse ? rolesResponse.roles : []
  const columns = [
    {
      title: <FormattedMessage id="users.list.header.avatar" />,
      dataIndex: 'avatar',
      key: 'avatar',
      render: (url, user) => (
        <AvatarColumn
          url={url}
          user={user}
          setOnBehalfToken={setOnBehalfToken}
        />
      ),
      width: 80,
    },
    {
      title: <FormattedMessage id="users.list.header.name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage id="users.list.header.username" />,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <FormattedMessage id="users.list.header.roles" />,
      dataIndex: 'roles',
      key: 'roles',
      render: (userRoles, user) => (
        <RolesList
          userRoles={userRoles}
          user={user}
          roles={roles}
          onChange={refetch}
        />
      ),
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

  const dataSource = users.map((user) => ({
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
            placeholder={intl.formatMessage({ id: 'users.search.placeholder' })}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputWrapper>
        <Table dataSource={dataSource} columns={columns} loading={loading} />
      </Flex>
    </>
  )
}
