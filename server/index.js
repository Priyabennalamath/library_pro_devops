require('dotenv').config();  // Load .env early

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import routers

const authRouter = require('./routes/authRouter');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const borrowalRouter = require('./routes/borrowalRouter');
const genreRouter = require('./routes/genreRouter');
const reviewRouter = require('./routes/reviewRouter');
const userRouter = require('./routes/userRouter');

// ... other routers

const app = express();
const PORT = process.env.PORT || 8082;

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to DB on MongoDB Atlas');
    console.log('Database Name:', mongoose.connection.name);

    // Insert a test document to create DB/collection if not present
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now },
    });

    const Test = mongoose.model('Test', testSchema);

    Test.estimatedDocumentCount()
      .then(count => {
        if (count === 0) {
          return Test.create({ name: 'Initial test document for revan DB' });
        }
      })
      .then(doc => {
        if (doc) console.log('Test doc created:', doc);
      })
      .catch(err => console.error('Test document error:', err));
  })
  .catch(err => console.error('DB connection error', err));

// Middleware setup
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require('./passport-config');
initializePassport(passport);

// API routes
app.use('/api/auth', authRouter);
app.use('/api/author', authorRouter);
app.use('/api/book', bookRouter);
app.use('/api/borrowal', borrowalRouter);
app.use('/api/genre', genreRouter);
app.use('/api/review', reviewRouter);
app.use('/api/user', userRouter);

// ... other routes

app.get('/', (req, res) => res.send('Welcome to Library Management System'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
