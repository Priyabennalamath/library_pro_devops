require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');  // Make sure the path is correct to your schema file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  return createUser();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Function to create and save a user
async function createUser() {
  try {
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
    console.log('User saved successfully!');
  } catch (error) {
    console.error('Error saving user:', error);
  } finally {
    mongoose.connection.close();
  }
}
