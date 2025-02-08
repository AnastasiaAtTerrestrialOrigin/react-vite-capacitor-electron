import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect } from 'vitest'
import App from './App'

test('renders Page1 by default', () => {
  render(<App />)
  const headingEl = screen.getByRole('heading', { name: /page1/i })
  expect(headingEl).toBeInTheDocument()
})

test('navigates from Page1 to Page2 when button is clicked', () => {
  render(<App />)
  const buttonElement = screen.getByRole('button', { name: /Go to Page2/i })
  fireEvent.click(buttonElement)
  const headingEl = screen.getByRole('heading', { name: /page2/i })
  expect(headingEl).toBeInTheDocument()
}) 