// TODO: Wrap app into a makeApp(db) function that accepts a db object
// TODO: Separate app into an app.js file, have server in server.js file
// Production mode: uses makeApp(actual db funcs)
// Test mode: uses makeApp(jest db funcs)


const request = require('supertest');
//const server = 'http://localhost:8080';
import { jest } from '@jest/globals';
// import makeApp rom './app.js'

const getPokemon = jest.fn();
const getInstruments = jest.fn();
const getGaffes = jest.fn();
const getPresets = jest.fn();
const getAll = jest.fn();
const savePrimary = jest.fn();
const login = jest.fn();
const signup = jest.fn();

const app = makeApp({
  getPokemon,
  getInstruments,
  getGaffes,
  getPresets,
  getAll,
  savePrimary,
  login,
  signup
})

describe('Login integration', () => {
  // TODO: Write test
  describe('/login', () => {
    describe('POST', () => {
      // Middleware: Controller.login, Controller.getALL. Expects 200, JSON object of "loginStatus".
      it('responds with 200 status and JSON content type', () => {});
    });
  })

  // TODO: Write test
  describe('/signup', () => {
    describe('POST', () => {
      // Middleware: Controller.signup Controller.getALL. Expects 200, no content response.
      it('responds with 200 status and no content type', () => {});
    });
  })
})

// JEST and supertest suite
describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // A note on asynchronicity: Note`request` evaluates to a promise.
      // Jest knows not to say  test  until promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => request(app)
        .get('/')
        .expect('Content-Type', /text\/html/) // "regex, " could have also been written as string
        .expect(200));
    });
  })

  // TODO: Write test
  describe('/all', () => {
    describe('POST', () => {
      // Middleware: controller.getAll. Expects 200, JSON object of "all".
      it('responds with 200 status and JSON content type', () => {});
    });
  })

  // TODO: Write test
  describe('/savePreset', () => {
    describe('POST', () => {
      // Middleware: Controller.savePrimary, Controller.savePreset, Controller.getALL. Expects 200, no content response.
      it('responds with 200 status and no content type', () => {});
    });
  })

  // TODO: Write test
  describe('/*', () => {
    describe('POST', () => {
      // Expects 404, no content response.
      it('responds with 404 status and no content type', () => {});
    });
    describe('GET', () => {
      // Expects 404, no content response.
      it('responds with 404 status and no content type', () => {});
    });
    describe('PUT', () => {
      // Expects 404, no content response.
      it('responds with 404 status and no content type', () => {});
    });
    describe('DELETE', () => {
      // Expects 404, no content response.
      it('responds with 404 status and no content type', () => {});
    });
  })

})
