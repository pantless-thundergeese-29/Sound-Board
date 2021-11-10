const controller = require('./database.js');



function sum(a, b) {
  return a + b;
}
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})

// TODO: Figure out how to pass in a mock database so as to test controllers in a "pure" manner

/* LOGIN CONTROLLERS */
describe ("Database controllers", () => {

  // Must describe "test" request and server errors so as to simulate actual conditions
  let req = {
    body: {

    }, 
    params: {

    }
  }
  //error = new Error("Test Error"),
  res = {},
  //expectedResult;

  beforeAll((done) => {
    // Anything that should happen before all tests below
    // Invoke done() if async;
    });
  ;

  afterAll((done) => {
    // Anything that should happen before all tests below
    // Invoke done() if async;
  });

  describe('getPokemon', () => {
    it('successfuly retrieves pokemon name and link from pokemon table', () => {
      // Queries from database: const qString =  'SELECT pokemon.name, pokemon.link FROM pokemon';
      // Sets res.locals.pokemon = data.rows;
      // Triggers global error message if query fails
      // Expect something. expect(x).toEqual(y);
    });
  });

  describe('getInstruments', () => {
    it('successfuly retrieves instruments name and link from instruments table', () => {
      // Queries from database: const qString =  'SELECT instruments.name, instruments.link FROM instruments';
      // Sets res.locals.instruments = data.rows;
      // Triggers global error message if query fails
      // Expect something. expect(x).toEqual(y);
    });
  });

  describe('getGaffes', () => {
    it('', () => {
      // Complete
    });
  });

  describe('getPresets', () => {
    it('', () => {
      // Complete
    });
  });

  describe('getALL', () => {
    it('', () => {
      // Complete
    });
  });

  describe('savePrimary', () => {
    it('', () => {
      // Complete
    });
  });

  describe('savePreset', () => {
    it('', () => {
      // Complete
    });
  });
})


/* LOGIN CONTROLLERS */
describe ("Login controllers", () => {
  describe('login', () => {
    it('', () => {
      // Complete
    });
  });

  describe('signup', () => {
    it('', () => {
      // Complete
    });
  });
})
