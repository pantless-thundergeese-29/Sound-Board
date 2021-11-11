const userController = require('../server/controllers/UserController.js');
const boardController = require('../server/controllers/BoardController.js');
const db = require('../server/mockDatabase.js');
const UserController = require('../server/controllers/UserController.js');

/* LOGIN CONTROLLERS */
describe ("Database controllers", () => {
  
  describe('UserController.login', () => {
    beforeEach((done) => {
      db.login.mockReset();
      res = {};
      next = jest.fn(err => {return "Error"});
      done();
      });

    it('passes non-empty username and password into DB before invoking next()', () => {
      const username = "ella"; const password = "ellaPW";
      const reqValid = { body: {userInfo : {username, password} } };
      const result = UserController.login(reqValid, res, next);
      expect(db.login.mock.calls[0][0]).toEqual(username);
      expect(db.login.mock.calls.length).toBe(1);
      expect(result).not.toContain("Error");
 
    });

    it('should only pass preset names into the database once', () => {
      const username = "ella"; const password = "ellaPW";
      const reqValid = { body: {userInfo : {username, password} } };
      result = UserController.login(reqValid, res, next);
      expect(db.login.mock.calls.length).toBe(1);
      expect(result).not.toContain("Error");
    });

  });

  describe('UserController.signup', () => {
    beforeEach((done) => {
      db.signup.mockReset();
      res = {};
      next = jest.fn(err => {return "Error"});
      done();
      });

    it('passes non-empty username and password into DB before invoking next()', () => {
      const username = "ella"; const password = "ellaPW";
      const reqValid = { body: {allInfo : {username, password} } };
      const result = UserController.signup(reqValid, res, next);
      expect(db.signup.mock.calls[0][0]).toEqual(username);
      expect(db.signup.mock.calls[0][1]).toEqual(password);
      expect(db.signup.mock.calls.length).toBe(1);
      expect(result).not.toContain("Error");
 
    });

    it('should only pass preset names into the database once', () => {
      const username = "ella"; const password = "ellaPW";
      const reqValid = { body: {allInfo : {username, password} } };
      result = UserController.signup(reqValid, res, next);
      expect(db.signup.mock.calls.length).toBe(1);
      expect(result).not.toContain("Error");
    });

    // it('should throw error if incorrect name or password entered', () => {
    //   const username = "ellie"; const password = "elliePW";
    //   const reqValid = { body: {allInfo : {username, password} } };
    //   result = UserController.signup(reqValid, res, next);
    //   expect(db.signup.mock.calls.length).toBe(1);
    //   expect(next.mock.results[0].value).toBe("Error");
    // });


  });
})


