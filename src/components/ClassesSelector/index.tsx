import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Input,
  InputNumber,
  RefSelectProps,
  Select,
  Form,
  FormRule,
} from 'antd'
import * as R from 'ramda'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { Flex } from '../../noui/Position'
import { Label } from '../../ui/Text'

export const CLASSES = [
  {
    name: 'barbarian',
    icon: require('./images/barbarian.png'),
  },
  {
    name: 'bard',
    icon: require('./images/bard.png'),
  },
  {
    name: 'cleric',
    icon: require('./images/cleric.png'),
  },
  {
    name: 'druid',
    icon: require('./images/druid.png'),
  },
  {
    name: 'fighter',
    icon: require('./images/fighter.png'),
  },
  {
    name: 'monk',
    icon: require('./images/monk.png'),
  },
  {
    name: 'paladin',
    icon: require('./images/paladin.png'),
  },
  {
    name: 'ranger',
    icon: require('./images/ranger.png'),
  },
  {
    name: 'rogue',
    icon: require('./images/rogue.png'),
  },
  {
    name: 'sorcerer',
    icon: require('./images/sorcerer.png'),
  },
  {
    name: 'warlock',
    icon: require('./images/warlock.png'),
  },
  {
    name: 'wizard',
    icon: require('./images/wizard.png'),
  },
]

const calcCurrentLevel: (value: Record<string, string>) => number = R.pipe(
  R.toPairs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  R.reduce(
    (acc: number, [_, lvl]: [unknown, string]) => acc + parseInt(lvl, 10),
    0,
  ),
)

const Image = styled.img<SpaceProps>`
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  ${space}
`

interface State {
  selectedClasses: string[]
  value: Record<string, string>
  isSelectOpen: boolean
}

interface Props {
  onSelect: (data: { value?: string; level?: number; state: State }) => void
  initialValue?: Record<string, string>
  name: string
  // TODO: check `value` prop, probably it is not used
  value?: {
    [index: string]: string
  }
  rules?: FormRule[]
}
class ClassesSelector extends React.PureComponent<Props, State> {
  state: State = {
    selectedClasses: [],
    value: {},
    isSelectOpen: false,
  }
  selectRef = React.createRef<RefSelectProps>()

  componentDidMount() {
    const { onSelect } = this.props
    this.setState(
      {
        value: this.props.initialValue || {},
        selectedClasses: R.keys(this.props.initialValue),
      },
      () => onSelect({ state: this.state }),
    )
  }

  render() {
    const { onSelect } = this.props
    const { selectedClasses, value, isSelectOpen } = this.state

    const onAddValue = (value: string) => {
      const test = calcCurrentLevel(this.state.value)

      if (test + 1 <= 20) {
        this.setState(
          (state) => {
            return {
              selectedClasses: R.append(value, state.selectedClasses),
              value: R.assoc(value, '1', state.value),
              isSelectOpen: false,
            }
          },
          () => {
            onSelect({ value, level: 1, state: this.state })
          },
        )
      }

      if (this.selectRef.current) {
        this.selectRef.current.blur()
      }
    }

    const onRemoveValue = (value: string) => {
      this.setState(
        (state) => ({
          selectedClasses: R.reject(R.identical(value), state.selectedClasses),
          value: R.dissoc(value, state.value),
          isSelectOpen: false,
        }),
        () => {
          onSelect({ value, level: 1, state: this.state })
        },
      )
    }

    return (
      <Flex column>
        <Select<string[]>
          ref={this.selectRef}
          mode="multiple"
          placeholder={<FormattedMessage id="character.class.placeholder" />}
          onSelect={onAddValue}
          onDeselect={onRemoveValue}
          onFocus={() => {
            this.setState(() => ({ isSelectOpen: true }))
          }}
          onBlur={() => {
            this.setState(() => ({ isSelectOpen: false }))
          }}
          defaultValue={R.keys(this.props.initialValue)}
          disabled={calcCurrentLevel(value) >= 20}
          open={isSelectOpen}
          data-testid="select-class"
        >
          {CLASSES.map((c) => (
            <Select.Option
              key={c.name}
              value={c.name}
              data-testid={`select-option-class-${c.name}`}
            >
              <FormattedMessage id={`character.class.name.${c.name}`} />
            </Select.Option>
          ))}
        </Select>

        <Form.Item name={this.props.name} rules={this.props.rules} noStyle>
          <Input style={{ display: 'none' }} />
        </Form.Item>

        {selectedClasses.map((c) => {
          const source = R.find(R.propEq('name', c.toLowerCase()), CLASSES)
          const classLvl = parseInt(this.state.value[c], 10)

          if (!source) {
            return null
          }

          return (
            <Flex key={source.name} data-testid="level-selector">
              <Image mr={10} src={source.icon} alt={source.name} />

              <InputNumber
                min={1}
                max={20 - calcCurrentLevel(this.state.value) + classLvl}
                value={classLvl}
                onChange={(level) => {
                  if (level) {
                    this.setState(
                      (state) => ({
                        value: R.assoc(c, level?.toString(), state.value),
                      }),
                      () =>
                        this.props.onSelect({
                          value: c,
                          level,
                          state: this.state,
                        }),
                    )
                  }
                }}
              />

              <Label>
                <FormattedMessage id={`character.class.name.${source.name}`} />
              </Label>
            </Flex>
          )
        })}
      </Flex>
    )
  }
}

export default ClassesSelector
