import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import * as R from 'ramda'
import moment from 'moment'
import {
  Button,
  Upload,
  Icon,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Slider,
  Checkbox,
  Row,
  Col,
  Tag,
  ConfigProvider,
} from 'antd'
import { Box, Flex } from 'noui/Position'
import Form, { Field } from 'noui/Form'
import { Msg, Header } from 'ui/Text'
import styled from 'styled-components'
import { playersInGame } from 'config'
import uk_UA from 'antd/lib/locale-provider/uk_UA'
import 'moment/locale/uk'
import { UsersSelect } from 'components/UsersSelect/UsersSelect'
import { useIntl, FormattedMessage } from 'react-intl'

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`

const useValidation = () => {
  const intl = useIntl()

  return useMemo(
    () => ({
      image: {
        presence: {
          message: intl.formatMessage({ id: 'validation.image.required' }),
        },
      },
      title: {
        presence: {
          message: intl.formatMessage({ id: 'validation.title.required' }),
        },
        length: {
          message: intl.formatMessage({ id: 'validation.title.length' }),
          minimum: 6,
        },
      },
      range: {
        presence: {
          message: intl.formatMessage({ id: 'validation.range.required' }),
          allowEmpty: false,
        },
      },
      date: {
        presence: {
          message: intl.formatMessage({ id: 'validation.date.required' }),
          allowEmpty: false,
        },
      },
      time: {
        presence: {
          message: intl.formatMessage({ id: 'validation.time.required' }),
          allowEmpty: false,
        },
      },
      players: {
        presence: {
          message: intl.formatMessage({ id: 'validation.players.required' }),
          allowEmpty: false,
        },
      },
      description: {
        presence: {
          message: intl.formatMessage({
            id: 'validation.description.required',
          }),
          allowEmpty: false,
        },
      },
    }),
    [intl],
  )
}

// Needs to show ant.design `DatePicked` with UA formatting
moment.locale('uk')

const GameForm = (props) => {
  const intl = useIntl()
  const {
    onSubmit,
    initialValues = { tags: [] },
    showSharing,
    users = [],
    withMasterField,
    user,
  } = props
  const validationSchema = useValidation()
  const isEdit = !!initialValues.id
  const usersWithLocals = useMemo(() => {
    const clone = [...users]
    if (initialValues.user) {
      const exist = !!clone.find((u) => u.id === initialValues.user.id)
      if (!exist) {
        clone.push(initialValues.user)
      }
    }
    if (user) {
      const exist = !!clone.find((u) => u.id === user.id)
      if (!exist) {
        clone.push(user)
      }
    }

    return clone
  }, [users, initialValues, user])
  const initialMaster =
    (initialValues.user && initialValues.user.id) || (user && user.id)

  const [tags, setTags] = useState(initialValues.tags)
  const [newTag, setNewTag] = useState('')
  const [showTagInput, setShowTagInput] = useState()
  const inputTag = useRef(null)

  const [image, setImage] = useState(initialValues ? initialValues.image : null)
  const [fileList, setFileList] = useState([])
  const [userId, setUserId] = useState()

  const handleNewTagClick = useCallback(() => {
    setShowTagInput(true)
  }, [])

  useEffect(() => {
    if (inputTag.current) inputTag.current.focus()
  }, [showTagInput])

  const handleNewTagConfirm = useCallback(() => {
    if (newTag) setTags([...tags, newTag])
    setNewTag('')
    setShowTagInput(false)
  }, [newTag, tags])

  return (
    <Form
      validation={validationSchema}
      onSubmit={({ date, time, range, ...data }, form) => {
        const game = {
          id: initialValues.id,
          ...data,
          image: image,
          startingDate: new Date(
            `${date.format('YYYY-MM-DD')} ${time.format('HH:mm')}`,
          ),
          lvlFrom: range[0],
          lvlTo: range[1],
          tags,
          userId,
        }
        onSubmit(game, form)
      }}
    >
      {({ form }) => (
        <Box>
          <Box mb={20}>
            {isEdit ? (
              <Header>
                <FormattedMessage id="gameForm.editNewGame" />
              </Header>
            ) : (
              <Header>
                <FormattedMessage id="gameForm.addNewGame" />
              </Header>
            )}
          </Box>

          {/* Master */}
          {withMasterField && (
            <Box mb={20}>
              <UsersSelect
                users={usersWithLocals}
                onChange={(value) => setUserId(value && value.id)}
                initial={initialMaster}
              />
            </Box>
          )}

          {/* Image */}
          <Flex column mb={20}>
            <Field name="image" initialValue={image}>
              <Upload.Dragger
                accept="image/*"
                beforeUpload={(file) => {
                  const fr = new FileReader()
                  fr.onload = () => setImage(fr.result)
                  fr.readAsDataURL(file)
                  setFileList([file])

                  return false
                }}
                onRemove={() => {
                  setFileList([])
                  setImage(null)
                  form.setFieldsValue({
                    image: null,
                  })
                }}
                fileList={fileList}
              >
                {image ? (
                  <StyledImage src={image} />
                ) : (
                  <>
                    <Msg className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </Msg>
                    <Msg className="ant-upload-text">
                      <FormattedMessage id="gameForm.image.upload" />
                    </Msg>
                  </>
                )}
              </Upload.Dragger>
            </Field>
          </Flex>

          {/* Title */}
          <Flex column>
            <Box>
              <Field
                initialValue={initialValues && initialValues.title}
                name="title"
              >
                <Input
                  placeholder={intl.formatMessage({ id: 'common.game.title' })}
                />
              </Field>
            </Box>

            {/* Levels */}
            <Box>
              <Msg>
                <FormattedMessage id="gameForm.levels.title" />
              </Msg>

              <Field
                initialValue={
                  initialValues && initialValues.lvlFrom && initialValues.lvlTo
                    ? [initialValues.lvlFrom, initialValues.lvlTo]
                    : [1, 4]
                }
                name="range"
              >
                <Slider
                  range
                  step={1}
                  min={1}
                  max={20}
                  marks={R.pipe(
                    R.repeat(R.__, 20),
                    R.addIndex(R.map)((v, idx) => ++idx),
                    R.map((n) => [n, n]),
                    R.fromPairs,
                  )(null)}
                />
              </Field>
            </Box>
          </Flex>

          <Row gutter={10}>
            {/* Date */}
            <Col xs={24} md={8}>
              <ConfigProvider locale={uk_UA}>
                <Field
                  name="date"
                  initialValue={
                    initialValues &&
                    initialValues.startingDate &&
                    moment(initialValues.startingDate)
                  }
                >
                  <DatePicker style={{ width: '100%' }} />
                </Field>
              </ConfigProvider>
            </Col>

            {/* Time */}
            <Col xs={24} md={8}>
              <ConfigProvider locale={uk_UA}>
                <Field
                  name="time"
                  initialValue={
                    initialValues &&
                    initialValues.startingDate &&
                    moment(initialValues.startingDate)
                  }
                >
                  <TimePicker
                    format="HH:mm"
                    minuteStep={10}
                    style={{ width: '100%' }}
                  />
                </Field>
              </ConfigProvider>
            </Col>

            {/* Players */}
            <Col xs={24} md={8}>
              <Field
                name="players"
                initialValue={initialValues && initialValues.players}
              >
                <Select
                  placeholder={intl.formatMessage({
                    id: 'gameForm.players.title',
                  })}
                >
                  {playersInGame.map((p) => (
                    <Select.Option key={p} value={p}>
                      {p}
                    </Select.Option>
                  ))}
                </Select>
              </Field>
            </Col>
          </Row>

          {/* Description */}
          <Field
            name="description"
            initialValue={initialValues && initialValues.description}
          >
            <Input.TextArea
              rows={6}
              placeholder={intl.formatMessage({
                id: 'gameForm.description.title',
              })}
            />
          </Field>

          <Row>
            <Col span={12}>
              <Field name="share" initialValue={false}>
                <Checkbox disabled={!showSharing}>
                  <FormattedMessage id="gameForm.share" />
                </Checkbox>
              </Field>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {tags.map((tag, idx) => (
                <Tag
                  key={tag}
                  closable
                  onClose={(e) => {
                    e.preventDefault()
                    setTags(R.remove(idx, 1, tags))
                  }}
                >
                  {tag}
                </Tag>
              ))}

              {showTagInput && (
                <Input
                  ref={inputTag}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onBlur={handleNewTagConfirm}
                  onPressEnter={handleNewTagConfirm}
                />
              )}

              {!showTagInput && (
                <Tag
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                  onClick={handleNewTagClick}
                >
                  <Icon type="plus" /> <FormattedMessage id="gameForm.newTag" />
                </Tag>
              )}
            </Col>
          </Row>

          <Box mt={15}>
            <Button disabled={form.hasErrors()} htmlType="submit">
              <FormattedMessage id="common.submit" />
            </Button>
          </Box>
        </Box>
      )}
    </Form>
  )
}

export default GameForm
