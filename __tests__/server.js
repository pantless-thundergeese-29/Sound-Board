const request = require('supertest');
const db = require('../server/mockDatabase.js')
const makeApp = require( '../server/app.js')

const app = makeApp(db);

describe('All Integration Tests', () => {

  describe('/api/all', () => {
    describe('POST', () => {
      it('responds with 200 status and JSON content type', () => {
        return request(app)
        .post('/api/all')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      });
    });
  })

  describe('/api/savePreset', () => {
    describe('POST', () => {
      it('responds with 200 status and no content type', () => {
        return request(app)
        .post('/api/all')
        .expect(200)
        // ADD LINE ABOUT EXPECTED BODY
        // .then(({ body }) => {
        //   expect(body).toBe("");
        // });
      });
    });
  })

  // describe('/api/login', () => {
  //   describe('POST', () => {
  //     it('responds with 200 status and JSON content type', () => {
  //       return request(app)
  //       .post('/api/all')
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)
  //       // ADD LINE ABOUT EXPECTED BODY
  //       // .then(({ body }) => {
  //       //   expect(body).toBe("");
  //       // });
  //       });
  //     });
  //   });

    describe('/api/signup', () => {
      describe('POST', () => {
        it('responds with 200 status and JSON content type', () => {
          return request(app)
          .post('/api/signup')
          .send({allInfo: {username: "elle", password: "ellePW"}})
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(({ body }) => {
            expect(body.username).toBe("elle");
          });
          });
        it('responds with username in the response body', () => {
          return request(app)
          .post('/api/signup')
          .send({allInfo: {username: "elle", password: "ellePW"}})
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(({ body }) => {
            expect(body.username).toBe("elle");
          });
          });
        });
      });

  })
