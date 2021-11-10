const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');

const PORT = 3000;

//handle parsing the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define route handler
app.use('/api', apiRouter);

//   return res.status(200).json({pokemon: res.locals.pokemon, instruments : res.locals.instruments, gaffes: res.locals.gaffes});
// });

app.use('*', (req,res) => {
  return res.sendStatus(404);
});

//express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An arror occured' },
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

//start server 
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});