require('dotenv').config(); // Load .env early

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import User model (make sure the path is correct)
const User = require('./models/user');

// Import routers
const authRouter = require('./routes/authRouter');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const borrowalRouter = require('./routes/borrowalRouter');
const genreRouter = require('./routes/genreRouter');
const reviewRouter = require('./routes/reviewRouter');
const userRouter = require('./routes/userRouter');

const app = express();
const PORT = process.env.PORT || 8082;

// Function to create and save a default librarian user
async function createDefaultLibrarian() {
    try {
        // Check if a user with this email already exists
        const existingUser = await User.findOne({ email: 'krishnapatil@gmail.com' });

        if (existingUser) {
            console.log('Default librarian user already exists. Skipping creation.');
            return; // Exit if user already exists
        }

        const user = new User({
            name: 'Krishna Patil',
            email: 'krishnapatil@gmail.com',
            dob: new Date('1990-01-01'),
            phone: '1234567890',
            isAdmin: true,
            photoUrl: 'https://example.com/photo.jpg',
        });

        // Set password (hash + salt)
        user.setPassword('krishna17');

        // Save to database
        await user.save();
        console.log('Default librarian user created successfully!');
    } catch (error) {
        console.error('Error creating default librarian user:', error);
    }
    // IMPORTANT: Do NOT close the mongoose connection here, as the main app needs it open.
}

// DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => { // Use async here to await createDefaultLibrarian
        console.log('Connected to DB on MongoDB Atlas');
        console.log('Database Name:', mongoose.connection.name);

        // Insert a test document to create DB/collection if not present
        const testSchema = new mongoose.Schema({
            name: String,
            createdAt: { type: Date, default: Date.now },
        });

        const Test = mongoose.model('Test', testSchema);

        await Test.estimatedDocumentCount()
            .then(count => {
                if (count === 0) {
                    return Test.create({ name: 'Initial test document for revan DB' });
                }
            })
            .then(doc => {
                if (doc) console.log('Test doc created:', doc);
            })
            .catch(err => console.error('Test document error:', err));

        // Call the function to create the default librarian user after DB connection
        await createDefaultLibrarian();
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

app.get('/', (req, res) => res.send('Welcome to Library Management System'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
