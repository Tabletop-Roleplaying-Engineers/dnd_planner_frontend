import React from 'react'
import { Input, InputNumber, Select } from 'antd'
import * as R from 'ramda'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { Field } from 'noui/Form'
import { Flex } from '../../noui/Position'
import { Label } from '../../ui/Text'

export const CLASSES = [
  {
    name: 'Barbarian',
    icon: require('./images/barbarian.png'),
  },
  {
    name: 'Bard',
    icon: require('./images/bard.png'),
  },
  {
    name: 'Cleric',
    icon: require('./images/cleric.png'),
  },
  {
    name: 'Druid',
    icon: require('./images/druid.png'),
  },
  {
    name: 'Fighter',
    icon: require('./images/fighter.png'),
  },
  {
    name: 'Monk',
    icon: require('./images/monk.png'),
  },
  {
    name: 'Paladin',
    icon: require('./images/paladin.png'),
  },
  {
    name: 'Ranger',
    icon: require('./images/ranger.png'),
  },
  {
    name: 'Rogue',
    icon: require('./images/rogue.png'),
  },
  {
    name: 'Sorcerer',
    icon: require('./images/sorcerer.png'),
  },
  {
    name: 'Warlock',
    icon: require('./images/warlock.png'),
  },
  {
    name: 'Wizard',
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
}
class ClassesSelector extends React.PureComponent<Props, State> {
  state: State = {
    selectedClasses: [],
    value: {},
    isSelectOpen: false,
  }
  selectRef = React.createRef<Select<string[]>>()

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
              value: R.assoc(value, 1, state.value),
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
          placeholder="Class"
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
              {c.name}
            </Select.Option>
          ))}
        </Select>

        <Field name={this.props.name}>
          <Input style={{ display: 'none' }} />
        </Field>

        {selectedClasses.map((c) => {
          const source = R.find(R.propEq('name', c), CLASSES)
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
                      (state) => ({ value: R.assoc(c, level, state.value) }),
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

              <Label>{source.name}</Label>
            </Flex>
          )
        })}
      </Flex>
    )
  }
}

export default ClassesSelector
