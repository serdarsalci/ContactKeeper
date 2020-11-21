const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect database
connectDB();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Init Middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the Contact APi' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

