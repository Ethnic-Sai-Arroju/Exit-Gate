const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin123@cluster0.jucku.mongodb.net/studentsDB?retryWrites=true&w=majority&appName=Cluster0', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const tempStudentRoutes = require('./routes/tempStudent');
const viewRoutes = require('./routes/views');

app.use(authRoutes);
app.use(studentRoutes);
app.use(tempStudentRoutes);
app.use(viewRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
