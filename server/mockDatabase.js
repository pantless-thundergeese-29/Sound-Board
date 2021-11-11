// Define jest functions for testing with mock database
const getAll = jest.fn();
const savePrimary = jest.fn();
const savePreset = jest.fn();
const login = jest.fn();
const signup = jest.fn();

// Define mock database with mock functions
const db = {
  getAll,
  savePrimary,
  savePreset,
  login,
  signup,
}

// Export mock database
module.exports = db;