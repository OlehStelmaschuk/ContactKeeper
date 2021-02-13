const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const path = require('path');

const app = express();

// ConnectDB
connectDB().then();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/users', require('./server/routes/users'));
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/contacts', require('./server/routes/contacts'));

// Serve static assets in prod

if (process.env.NODE_ENV === 'production') {
  //  Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.use(express.static('client/build'));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
