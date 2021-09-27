const mongooose = require('mongoose');

const express = require('express');
const app = express();
const user = require('./routes/users');



mongooose.connect('mongodb://localhost/gram')
  .then(() => console.log('Connect to MongoDB...'))
  .catch( err => console.error('Could not connect to MongoDB...'));



app.use(express.json());
app.use('/api/users', user)



const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));



