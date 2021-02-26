import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Select } from 'antd'
import ClassesSelector, { CLASSES } from './index'
import { act } from 'react-dom/test-utils'

jest.mock('noui/Form', () => {
  return {
    __esModule: true,
    Field: (props: any) => <div {...props} />,
  }
})
jest.mock('antd', () => {
  return {
    __esModule: true,
    Select: jest.fn().mockReturnValue(<div />),
    Input: (props: any) => <input {...props} />,
    InputNumber: (props: any) => <input {...props} />,
  }
})

const getPageObject = () => {
  const component = <ClassesSelector onSelect={() => {}} name="testName" />
  const result = render(component)

  return {
    ...result,
    getInput: async () => {
      const select = await result.getByTestId('select-class')

      return select.querySelector('input')
    },
    getLevelSelector: async () => {
      const elements = await result.getAllByTestId('level-selector')

      return elements.map((el) => el.querySelector('input'))
    },
  }
}
describe('ClassesSelector', async () => {
  const SelectMock = (Select as unknown) as jest.Mock
  test('should render without crash', async () => {
    getPageObject()
  })

  test('should be able to select class', async () => {
    const value = CLASSES[0].name
    SelectMock.mockImplementation(({ onSelect, ...props }) => (
      <button onClick={() => onSelect(value)} data-testid="select-mock" />
    ))
    const result = getPageObject()
    const select = await result.getByTestId('select-mock')

    await act(async () => {
      fireEvent.click(select)
    })

    const levelInputs = await result.getLevelSelector()
    expect(levelInputs[0]).toHaveValue('1')
  })

  test('should be able to select two class', async () => {
    let value = CLASSES[0].name
    SelectMock.mockImplementation(({ onSelect, ...props }) => (
      <button onClick={() => onSelect(value)} data-testid="select-mock" />
    ))
    const result = getPageObject()
    const select = await result.getByTestId('select-mock')

    await act(async () => {
      fireEvent.click(select)
    })

    await act(async () => {
      value = CLASSES[1].name
      fireEvent.click(select)
    })

    const levelInputs = await result.getLevelSelector()
    expect(levelInputs.length).toBe(2)
    expect(levelInputs[0]).toHaveValue('1')
    expect(levelInputs[1]).toHaveValue('1')
  })
})
