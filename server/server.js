const db = require('./databaseFuncs.js')
const makeApp = require('./app.js')

// Create Express App
const app = makeApp(db)

//Start Server 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});