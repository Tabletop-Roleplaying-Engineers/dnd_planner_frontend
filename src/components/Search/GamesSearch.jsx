import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { Table, Input, Tag, Row, Col, Popover, Icon } from 'antd'
import { Flex, Box } from 'noui/Position'
import { useDebounce } from 'utils/hooks'
import { useDateFormat } from 'utils/hooks/useDateFormat'
import { UsersSelect } from 'components/UsersSelect/UsersSelect'
import { useMemo } from 'react'

const Container = styled.div``
const ImageInColumn = styled.img`
  max-width: 150px;
  max-height: 150px;
`

const TimeColumn = ({ time }) => {
  const format = useDateFormat()

  return format(time, 'dd MMMM HH:mm')
}
const useColumns = () => {
  const intl = useIntl()
  const columns = useMemo(() => [
    {
      title: intl.formatMessage({ id: 'search.table.image' }),
      dataIndex: 'image',
      key: 'image',
      render: (url, game) => <ImageInColumn src={url} alt="game" />,
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
      render: user => {
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
      render: startingDate => (
        <TimeColumn time={new Date(parseInt(startingDate))} />
      ),
    },
    {
      title: intl.formatMessage({ id: 'search.table.tags' }),
      dataIndex: 'tags',
      key: 'tags',
      render: tags => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
    },
  ])

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
  const debouncedTitle = useDebounce(title, 300)
  const debouncedTag = useDebounce(tag, 300)
  const debouncedUserId = useDebounce(userId, 300)
  const columns = useColumns()

  useEffect(() => {
    onSearch({
      title: debouncedTitle,
      tag: debouncedTag,
      userId: debouncedUserId,
    })
  }, [onSearch, debouncedTitle, debouncedTag, debouncedUserId])

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24} md={8}>
          <UsersSelect
            users={users}
            onChange={value => setUserId(value && value.id)}
            withEmpty
          />
        </Col>
        <Col span={24} md={8}>
          <Popover content={titlePopoverContent} trigger="focus">
            <Input
              value={title}
              placeholder={intl.formatMessage({ id: 'common.game.title' })}
              onChange={e => setTitle(e.target.value)}
            />
          </Popover>
        </Col>
        <Col span={24} md={8}>
          <Popover content={tagPopoverContent} trigger="focus">
            <Input
              value={tag}
              placeholder={intl.formatMessage({ id: 'common.game.tag' })}
              onChange={e => setTag(e.target.value)}
            />
          </Popover>
        </Col>
      </Row>
      <Table
        dataSource={games}
        columns={columns}
        loading={loading}
        scroll={{ x: true }}
      />
    </Container>
  )
}
