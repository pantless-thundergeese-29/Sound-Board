const request = require('supertest');
const server = 'http://localhost:8080';


describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // A note on asynchronicity: Note`request` evaluates to a promise.
      // Jest knows not to say  test  until promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => request(server)
        .get('/')
        .expect('Content-Type', /text\/html/) // "regex, " could have also been written as string
        .expect(200));
    });
  })
})