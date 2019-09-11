const express = require('express');
const path = require('path');
const createError = require('http-errors');
var cors = require('cors');

var indexRouter = require('./routes/index');

const app = express();

app.use(cors())

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set local
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', indexRouter);

// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
