import { render } from '@testing-library/react';
import App from './App';


it('renders tv show cards', () => {
  const {queryAllByTitle} = render(<App />)
  const title = queryAllByTitle('showCards')
  expect(title).toBeTruthy();
});

it('renders season cards', () => {
  const {queryAllByTitle} = render(<App />)
  const title = queryAllByTitle('seasonCards')
  expect(title).toBeTruthy();
});

it('renders cast cards', () => {
  const {queryAllByTitle} = render(<App />)
  const title = queryAllByTitle('castCards')
  expect(title).toBeTruthy();
});