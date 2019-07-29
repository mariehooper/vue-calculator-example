import { render, fireEvent, cleanup } from '@testing-library/vue';
import '@testing-library/jest-dom/extend-expect';
import Calculator from './Calculator';

function setup() {
  const { getByTestId } = render(Calculator);
  return {
    displayValue: getByTestId('displayValue'),
    oneButton: getByTestId('1'),
    twoButton: getByTestId('2'),
    addButton: getByTestId('+'),
    equalButton: getByTestId('='),
    clearButton: getByTestId('C')
  };
}

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test('adds two single-digit vals and renders correct result', async () => {
  const {
    displayValue,
    oneButton,
    twoButton,
    addButton,
    equalButton
  } = setup();

  expect(displayValue).toHaveTextContent('0');

  await fireEvent.click(oneButton);
  await fireEvent.click(addButton);
  await fireEvent.click(twoButton);
  await fireEvent.click(equalButton);

  expect(displayValue).toHaveTextContent('3');
});

test('adds two double-digit vals and renders correct result', async () => {
  const {
    displayValue,
    oneButton,
    twoButton,
    addButton,
    equalButton
  } = setup();

  await fireEvent.click(oneButton);
  await fireEvent.click(oneButton);
  await fireEvent.click(addButton);
  await fireEvent.click(twoButton);
  await fireEvent.click(oneButton);
  await fireEvent.click(equalButton);

  expect(displayValue).toHaveTextContent('32');
});

test('renders correct result when second operation is entered', async () => {
  const {
    displayValue,
    oneButton,
    twoButton,
    addButton,
    equalButton
  } = setup();

  await fireEvent.click(oneButton);
  await fireEvent.click(addButton);
  await fireEvent.click(twoButton);
  await fireEvent.click(addButton);

  expect(displayValue).toHaveTextContent('3');

  await fireEvent.click(twoButton);
  await fireEvent.click(equalButton);

  expect(displayValue).toHaveTextContent('5');
});

test('sets display back to 0 and clears entries when clear pressed', async () => {
  const {
    displayValue,
    oneButton,
    twoButton,
    addButton,
    clearButton
  } = setup();

  await fireEvent.click(oneButton);
  await fireEvent.click(addButton);
  await fireEvent.click(twoButton);
  await fireEvent.click(clearButton);

  expect(displayValue).toHaveTextContent('0');
});
