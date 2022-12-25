import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ClassesSelector from './index'
import { act } from 'react-dom/test-utils'
import { TestWrapper } from 'utils/test'
import { Form } from 'antd'

const getPageObject = () => {
  const component = (
    <TestWrapper>
      <Form onFinish={() => {}}>
        <ClassesSelector onSelect={() => {}} name="testName" />
      </Form>
    </TestWrapper>
  )
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
describe('ClassesSelector', () => {
  test('should render without crash', async () => {
    getPageObject()
  })

  test('should be able to select class', async () => {
    const result = getPageObject()

    await act(async () => {
      fireEvent.click(result.getByText('Class'))
    })

    const barbarian = await result.findByText('Barbarian')
    await act(async () => {
      fireEvent.click(barbarian)
    })

    const levelInputs = await result.getLevelSelector()
    expect(levelInputs[0]).toHaveValue('1')
  })

  test('should be able to select two classes', async () => {
    const result = getPageObject()

    await act(async () => {
      fireEvent.click(result.getByText('Class'))
    })

    const barbarian = await result.findByText('Barbarian')
    await act(async () => {
      fireEvent.click(barbarian)
    })

    const wizard = await result.findByText('Wizard')
    await act(async () => {
      fireEvent.click(wizard)
    })

    const levelInputs = await result.getLevelSelector()
    expect(levelInputs.length).toBe(2)
    expect(levelInputs[0]).toHaveValue('1')
    expect(levelInputs[1]).toHaveValue('1')
  })
})
