const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
    throw result.error;
  }

connectDb();
const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`You are listening on ${port}`);
});