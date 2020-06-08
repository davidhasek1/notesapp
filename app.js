const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./util/database');

const welcomeRouter = require('./routes/welcomeRouter');
const notesRouter = require('./routes/notesRouter');
const savedRouter = require('./routes/savedNotesRouter');
const adminRouter = require('./routes/adminRouter');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRouter);
app.use(notesRouter);
app.use(savedRouter);
app.use(welcomeRouter);

app.listen(2000);
