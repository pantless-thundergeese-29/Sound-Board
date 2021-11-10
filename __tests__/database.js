const db = require('./database.js');

// TODO: Figure out how to test database without affecting actual database contents
// EXAMPLE JEST TEST BELOW
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})



