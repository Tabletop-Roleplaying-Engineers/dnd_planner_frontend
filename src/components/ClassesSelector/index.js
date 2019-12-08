import { Input, InputNumber, Select } from 'antd'
import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { Field } from '../../noui/Form'
import { Flex } from '../../noui/Position'
import { Label } from '../../ui/Text'

export const CLASSES = [
  {
    name: 'Barbarian',
    icon: require('./images/barbarian.png')
  },
  {
    name: 'Bard',
    icon: require('./images/bard.png')
  },
  {
    name: 'Cleric',
    icon: require('./images/cleric.png')
  },
  {
    name: 'Druid',
    icon: require('./images/druid.png')
  },
  {
    name: 'Fighter',
    icon: require('./images/fighter.png')
  },
  {
    name: 'Monk',
    icon: require('./images/monk.png')
  },
  {
    name: 'Paladin',
    icon: require('./images/paladin.png')
  },
  {
    name: 'Ranger',
    icon: require('./images/ranger.png')
  },
  {
    name: 'Rogue',
    icon: require('./images/rogue.png')
  },
  {
    name: 'Sorcerer',
    icon: require('./images/sorcerer.png')
  },
  {
    name: 'Warlock',
    icon: require('./images/warlock.png')
  },
  {
    name: 'Wizard',
    icon: require('./images/wizard.png')
  },
]

const calcCurrentLevel = R.pipe(
  R.toPairs,
  R.reduce(
    (acc, [_, lvl]) => acc + parseInt(lvl, 10),
    0
  )
)

const Image = styled.img`
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  ${space}
`

class ClassesSelector extends React.PureComponent {
  state = {
    selectedClasses: [],
    value: {},
    isSelectOpen: false
  }

  constructor(props) {
    super(props);

    this.selectRef = React.createRef();
  }

  componentDidMount() {
    const { onSelect } = this.props
    this.setState(
      {
        value: this.props.initialValue || {},
        selectedClasses: R.keys(this.props.initialValue),
      },
      () => onSelect({ state: this.state })
    )
  }

  render () {
    const { onSelect } = this.props
    const { selectedClasses, value, isSelectOpen } = this.state

    const onAddValue = value => {
      const test = calcCurrentLevel(this.state.value)

      if(test + 1 <= 20) {
        this.setState(
          state => {
            return ({
              selectedClasses: R.append(value, state.selectedClasses),
              value: R.assoc(value, 1, state.value),
              isSelectOpen: false
            })
          },
          () => {
            onSelect({ value, level: 1, state: this.state })
          }
        )
      }

      this.selectRef.current.blur()
    }

    const onRemoveValue = value => {
      this.setState(
        state => ({
          selectedClasses: R.reject(R.identical(value), state.selectedClasses),
          value: R.dissoc(value, state.value),
          isSelectOpen: false
        }),
        () => { onSelect({ value, level: 1, state: this.state }) }
      )
    }

    return (
      <Flex column>
        <Select
          ref={this.selectRef}
          mode="multiple"
          placeholder="Class"
          onSelect={onAddValue}
          onDeselect={onRemoveValue}
          onFocus={() => {
            this.setState(() => ({ isSelectOpen: true }))}
          }
          onBlur={() => {
            this.setState(() => ({ isSelectOpen: false }))}
          }
          defaultValue={R.keys(this.props.initialValue)}
          disabled={calcCurrentLevel(value) >= 20}
          open={isSelectOpen}
          data-testid="select-class"
        >
          {
            CLASSES.map(c =>
              <Select.Option
                key={c.name}
                value={c.name}
                data-testid={`select-option-class-${c.name}`}
              >
                {c.name}
              </Select.Option>
            )
          }
        </Select>

        <Field name={this.props.name}>
          <Input style={{display: 'none'}}/>
        </Field>

        {
          selectedClasses.map(c => {
            const source = R.find(R.propEq('name', c), CLASSES)

            return (
              <Flex key={source.name}>
                <Image
                  mr={10}
                  src={source.icon}
                  alt={source.name}
                />

                <InputNumber
                  min={1}
                  max={20 - calcCurrentLevel(this.state.value) + parseInt(this.state.value[source.name], 10)}
                  defaultValue={1}
                  onChange={level => {
                    if(level) {
                      this.setState(
                        state => ({ value: R.assoc(c, level, state.value) }),
                        () => this.props.onSelect({value: c, level, state: this.state})
                      )
                    }
                  }}
                />

                <Label>{source.name}</Label>
              </Flex>
            )
          })
        }
      </Flex>
    )
  }
}

export default ClassesSelector
