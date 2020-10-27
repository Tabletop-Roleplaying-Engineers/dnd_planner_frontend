import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Drawer, Table, Input, Tag, Row, Col, Popover, Icon } from 'antd'
import { Flex, Box } from 'noui/Position'
import { useDebounce } from 'utils/hooks'
import { useDateFormat } from 'utils/hooks/useDateFormat'
import { UsersSelect } from 'components/UsersSelect/UsersSelect'
import { modalWidth } from 'config'
import { FullGameContainer } from 'containers/Game/FullGameContainer'
import { EditGameDrawer } from 'containers/Game/EditGameDrawer'
import { parseGame } from 'utils/common'

const Container = styled.div``
const ImageInColumn = styled.img`
  max-width: 150px;
  max-height: 150px;
`
const TagPointer = styled(Tag)`
  &.ant-tag {
    cursor: pointer;
  }
`

const TimeColumn = ({ time }) => {
  const format = useDateFormat()

  return format(time, 'dd MMMM HH:mm')
}
const useColumns = ({ onTagClick = () => {} }) => {
  const intl = useIntl()
  const columns = useMemo(
    () => [
      {
        title: intl.formatMessage({ id: 'search.table.image' }),
        dataIndex: 'image',
        key: 'image',
        render: (url) => <ImageInColumn src={url} alt="game" />,
      },
      {
        title: intl.formatMessage({ id: 'search.table.title' }),
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: intl.formatMessage({ id: 'search.table.gm' }),
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
          if (user.firstName || user.lastName) {
            return `${user.firstName || ''} ${user.lastName || ''} (${
              user.username
            })`
          }

          return `${user.username}`
        },
      },
      {
        title: intl.formatMessage({ id: 'search.table.levels' }),
        dataIndex: 'levels',
        key: 'levels',
        render: (_, game) => `${game.lvlFrom} - ${game.lvlTo}`,
      },
      {
        title: intl.formatMessage({ id: 'search.table.starting' }),
        dataIndex: 'startingDate',
        key: 'startingDate',
        render: (startingDate) => (
          <TimeColumn time={new Date(parseInt(startingDate))} />
        ),
      },
      {
        title: intl.formatMessage({ id: 'search.table.tags' }),
        dataIndex: 'tags',
        key: 'tags',
        render: (tags) =>
          tags.map((tag) => (
            <TagPointer key={tag} onClick={(e) => onTagClick(e, tag)}>
              {tag}
            </TagPointer>
          )),
      },
    ],
    [intl, onTagClick],
  )

  return columns
}
const titlePopoverContent = (
  <Flex alignItems="center">
    <Icon type="exclamation-circle" />
    <Box ml="5px">
      <FormattedMessage id="search.titleInput.tooltip" />
    </Box>
  </Flex>
)
const tagPopoverContent = (
  <Flex alignItems="center">
    <Icon type="exclamation-circle" />
    <Box ml="5px">
      <FormattedMessage id="search.tagInput.tooltip" />
    </Box>
  </Flex>
)

export const GamesSearch = ({
  games = [],
  onSearch,
  loading = false,
  users,
}) => {
  const intl = useIntl()
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [userId, setUserId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [gameForEdit, setGameForEdit] = useState(null)
  const debouncedTitle = useDebounce(title, 300)
  const debouncedTag = useDebounce(tag, 300)
  const debouncedUserId = useDebounce(userId, 300)
  const onTagClick = useCallback((e, tag) => {
    setTag(`"${tag}"`)
    e.stopPropagation()
  }, [])
  const columns = useColumns({
    onTagClick,
  })
  const searchCurrent = useCallback(() => {
    onSearch({
      title: debouncedTitle,
      tag: debouncedTag,
      userId: debouncedUserId,
    })
  }, [onSearch, debouncedTitle, debouncedTag, debouncedUserId])
  const onSelectedUpdate = useCallback(
    (game) => {
      setSelected(game)
      searchCurrent()
    },
    [searchCurrent],
  )
  const onEditClick = useCallback(() => {
    setGameForEdit(parseGame(selected))
    setSelected(null)
  }, [selected])
  const onCancelEditing = useCallback(() => {
    setGameForEdit(null)
  }, [])
  const onGameUpdated = useCallback(() => {
    setGameForEdit(null)
    searchCurrent()
  }, [searchCurrent])

  useEffect(() => {
    searchCurrent()
  }, [searchCurrent, onSelectedUpdate])

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24} md={8}>
          <UsersSelect
            users={users}
            onChange={(value) => setUserId(value && value.id)}
            withEmpty
          />
        </Col>
        <Col span={24} md={8}>
          <Popover content={titlePopoverContent} trigger="focus">
            <Input
              value={title}
              placeholder={intl.formatMessage({ id: 'common.game.title' })}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Popover>
        </Col>
        <Col span={24} md={8}>
          <Popover content={tagPopoverContent} trigger="focus">
            <Input
              value={tag}
              placeholder={intl.formatMessage({ id: 'common.game.tag' })}
              onChange={(e) => setTag(e.target.value)}
            />
          </Popover>
        </Col>
      </Row>
      <Table
        dataSource={games}
        columns={columns}
        loading={loading}
        scroll={{ x: true }}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setSelected(record),
        })}
      />

      <Drawer
        destroyOnClose={true}
        width={modalWidth()}
        placement="right"
        closable={false}
        visible={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <FullGameContainer
            game={selected}
            onUpdate={onSelectedUpdate}
            onEditClick={onEditClick}
          />
        )}
      </Drawer>

      {/* Edit game */}
      <EditGameDrawer
        game={gameForEdit}
        onUpdated={onGameUpdated}
        onCancel={onCancelEditing}
      />
    </Container>
  )
}
