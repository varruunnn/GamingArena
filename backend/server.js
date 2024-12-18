const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const infoRoute = require("./routes/info");
const nodemailer = require("nodemailer");
const asyncHandler =  require("express-async-handler");
const uuid = require('uuid');
const bcrypt = require("bcryptjs"); 
const token=require("./utils/token");
const jwt = require("jsonwebtoken"); 


dotenv.config();
const secretKey = require("crypto").randomBytes(64).toString("hex");
console.log(secretKey);
const app = express();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin:{
    type: Boolean,
    required: true,
    default: false,
  },
  pic: {
    type: String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0WxUN-7oo2ohLaRUl42eNDHi_EYBL6O5uLA&s",
  },
},{
  timestamps: true,
});


const User = mongoose.model("User", userSchema);
const { v4: uuidv4 } = require('uuid');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});
const OTP = mongoose.model('OTP', otpSchema);
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'biggamewars@gmail.com',
    pass: 'lmcg pgcy epgr ltyd', 
  },
  secure: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error);
  } else {
    console.log('Server is ready to send emails:', success);
  }
});


app.post('/register', async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 300000,
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for Signup',
      text: `Your OTP for completing the signup process is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    await newUser.save();
    res.status(200).json({ message: 'OTP sent to your email. Please verify.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await OTP.findOne({ email, otp });
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    await OTP.deleteOne({ email, otp });
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Searching for user with email:', email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token:token(user._id),
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Failed to log in user' });
  }
});
app.get('/profile', protect, asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile details" });
  }
}));

app.put('/profile', protect, asyncHandler(async (req, res) => {
  const { name, pic, password } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.pic = pic || user.pic;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile details" });
  }
}));


app.post('/send-email', (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: 'biggamewars@gmail.com',
    to: 'biggamewars@gmail.com',
    subject: `Contact Form Message from ${name}`,
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

const playerSchema = new mongoose.Schema({
  name: String,
  game: String,
  score: Number,
  rank: Number,
});

const Player = mongoose.model("Player", playerSchema);

const matches = [
  { id: 1, team1: "Team Falcon", team2: "Team Buddy", status: "Match Started" },
  { id: 2, team1: "Team OP", team2: "Team PO", status: "Upcoming Match" },
];

app.get("/matches", (req, res) => {
  res.json(matches);
});

app.use("/info", infoRoute);

app.get("/tournaments", (req, res) => {
  const games = [
    {
      id: 1,
      name: "Valorant",
      platform: "PC",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC3nyfz3FDFQq2tYEqm_5_UYeSVzSAT0ySqw&s",
    },
    {
      id: 2,
      name: "BGMI",
      platform: "Mobile",
      image: "https://1.bp.blogspot.com/-pu-EF5lF2uM/YPEZ39k4LII/AAAAAAAAA4A/nuMpjhJbp9MsM2fuY2MYflemWWbkw3u5wCLcBGAsYHQ/s512/BGMI-Logo-PNG%2BDownload.jpg",
    },
  ];
  res.json(games);
});

app.get("/leaderboard/:game", async (req, res) => {
  try {
    const game = req.params.game;
    console.log("Game requested:", game);
    const players = await Player.find({ game: { $regex: new RegExp(game, "i") } }).sort({ rank: 1 });
    console.log("Players fetched:", players);

    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.get("/seed", async (req, res) => {
  try {
    const data = [
      { name: "Player1", game: "Valorant", score: 1500, rank: 1 },
      { name: "Player2", game: "Valorant", score: 1400, rank: 2 },
      { name: "Player3", game: "Valorant", score: 1350, rank: 3 },
      { name: "Player4", game: "BGMI", score: 2000, rank: 1 },
      { name: "Player5", game: "BGMI", score: 1900, rank: 2 },
      { name: "Player6", game: "BGMI", score: 1850, rank: 3 },
    ];

    await Player.insertMany(data);
    res.json({ message: "Data seeded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed data" });
  }
});
app.post("/register/bgmi", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: "Username and Email are required" });
  }

  registrations.BGMI.push({ username, email });
  return res.status(200).json({ message: "Successfully registered for BGMI!" });
});

// Register for Valorant
app.post("/register/valorant", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: "Username and Email are required" });
  }

  registrations.Valorant.push({ username, email });
  return res.status(200).json({ message: "Successfully registered for Valorant!" });
});
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
