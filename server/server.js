const db = require('./database.js')
const makeApp = require('./app.js')


const app = makeApp(db)

//start server 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});