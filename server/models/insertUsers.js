// Importing modules
const mongoose = require("mongoose");
const User = require("./user"); // Adjust the path as necessary

// Connecting to MongoDB
mongoose
  .connect("mongodb+srv://sumitpatil172003:krishnapatil@cluster0.h83nn.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Define user data (with plaintext passwords)
    const usersData = [
      {
        name: "Krishna Patil",
        email: "krishnapatil@gmail.com",
        dob: new Date("2003-11-17"),
        phone: "8660104674",
        isAdmin: true,
        photoUrl: "https://example.com/photo1.jpg",
        password: "krishna17", // Plaintext password to hash
      },
      {
        name: "Sumit Patil",
        email: "sumitpatil@gmail.com",
        dob: new Date("2004-07-20"),
        phone: "8660104675",
        isAdmin: false,
        photoUrl: "https://example.com/photo2.jpg",
        password: "sumit17",
      },
      {
        name: "Sumit Fade",
        email: "sumitfade@gmail.com",
        dob: new Date("2004-07-24"),
        phone: "8975423625",
        isAdmin: false,
        photoUrl: "https://example.com/photo3.jpg",
        password: "sumit123",
      },
      {
        name: "Revansiddha Biradar",
        email: "revansiddha@gmail.com",
        dob: new Date("2003-11-26"),
        phone: "8475961235",
        isAdmin: false,
        photoUrl: "https://example.com/photo4.jpg",
        password: "revansiddha123",
      },
      {
        name: "Dulesh Shivkale",
        email: "dulesh@gmail.com",
        dob: new Date("2004-01-16"),
        phone: "7548961234",
        isAdmin: false,
        photoUrl: "https://example.com/photo5.jpg",
        password: "dulesh123",
      },
    ];

    // Create users using the Mongoose model
    for (const userData of usersData) {
      const user = new User(userData);
      user.setPassword(userData.password); // Use the schema method to hash the password
      await user.save(); // Save the user to the database
    }

    console.log("Users inserted successfully");
    mongoose.connection.close(); // Close the connection
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    mongoose.connection.close();
  });
