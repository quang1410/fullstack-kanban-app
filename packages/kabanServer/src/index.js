const express = require('express');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: '.env.example' });
const route = require('./routes');
const database = require('./configs/database');
const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

// Middle ware
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(logger('dev'));
app.use(cors());
app.use(express.json());

database.connect();

//routes
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
