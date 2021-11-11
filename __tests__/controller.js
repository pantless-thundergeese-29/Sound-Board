const userController = require('../server/controllers/UserController.js');
const boardController = require('../server/controllers/BoardController.js');
const db = require('../server/mockDatabase.js')

/* DATABASE CONTROLLERS */
describe ("Database controllers", () => {
  
  beforeEach((done) => {
    done();
    });
  ;

  afterAll((done) => {
    done();
  });
  
  describe('savePreset', () => {
    beforeEach((done) => {
      db.savePreset.mockReset();
      done();
      });

    it('successfuly passes preset names into the database', () => {
      const newPreset = ["one", "two"];
      db.savePreset(newPreset);
      expect(db.savePreset.mock.calls[0][0]).toBe(newPreset)
    });

    it('should only pass preset names into the database once', () => {
      const newPreset = ["one", "two"];
      db.savePreset(newPreset);
      expect(db.savePreset.mock.calls.length).toBe(1)

    });
  });
})


/* LOGIN CONTROLLERS */
// describe ("Login controllers", () => {
//   describe('login', () => {
//     it('', () => {
//       // Complete
//     });
//   });

//   describe('signup', () => {
//     it('', () => {
//       // Complete
//     });
//   });
// })
