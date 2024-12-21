const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const infoRoute = require("./routes/info");
const termsRoutes = require("./routes/termsRoutes");
const nodemailer = require("nodemailer");
const asyncHandler =  require("express-async-handler");
const bcrypt = require("bcryptjs"); 
const token=require("./utils/token");
const jwt = require("jsonwebtoken"); 


dotenv.config();
const secretKey = require("crypto").randomBytes(64).toString("hex");
console.log(secretKey);
const app = express();
const userSchema = new mongoose.Schema(
  {
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
      minlength: [8, "Password must be at least 8 characters long"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);
const { v4: uuidv4 } = require('uuid');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});
const OTP = mongoose.model('OTP', otpSchema);
const protect = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next(); 
  } catch (error) {
    console.error("JWT verification failed:", error); 
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/terms", termsRoutes);
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'biggamewars@gmail.com',
    pass: 'lmcg pgcy epgr ltyd', 
  },
  secure: true,
});
app.post("/accept", (req, res) => {
  const { accepted } = req.body;
  if (accepted) {
    acceptedTerms = true;
    res.status(200).send({ message: "Terms accepted." });
  } else {
    res.status(400).send({ message: "Failed to accept terms." });
  }
});
app.get("/terms",(req,res)=>{
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* Include the Cyberpunk CSS here */
  </style>
</head>
<body>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
      fontFamily: "'Orbitron', sans-serif",
      backgroundColor: "#000",
      minHeight: "100vh",
      color: "#fff",
    }}
  >
    <h2>Terms and Conditions</h2>
    <div
      style={{
        maxWidth: "800px",
        overflowY: "auto",
        padding: "20px",
        border: "1px solid #00E0FF",
        borderRadius: "10px",
        backgroundColor: "#111",
        color: "#ddd",
        fontSize: "16px",
        lineHeight: "1.8",
      }}
    >
      <p><strong>Welcome to BigGameWars!</strong></p>
      <p>
        By using our platform and participating in the tournaments hosted on our website,
        you agree to abide by the following terms and conditions. These terms are designed
        to ensure a fair and secure experience for all participants. If you do not agree with
        these terms, please refrain from using our services.
      </p>
      <h2>1. Eligibility</h2>
      <p><strong>1.1.</strong> Participants must meet the age requirements of the respective games, such as BGMI and Valorant, as per their official guidelines.</p>
      <p><strong>1.2.</strong> Participants must have valid gaming accounts and provide accurate details during registration.</p>
      <p><strong>1.3.</strong> Employees, contractors, or affiliates of BigGameWars are not eligible to participate in tournaments unless explicitly stated.</p>
      <h2>2. Registration</h2>
      <p><strong>2.1.</strong> All users must register for tournaments through the BigGameWars platform.</p>
      <p><strong>2.2.</strong> Registration fees, if applicable, must be paid through Razorpay or other approved payment gateways.</p>
      <p><strong>2.3.</strong> Incorrect or fraudulent registration information may result in disqualification without a refund.</p>
      <h2>3. Payments and Refunds</h2>
      <p><strong>3.1.</strong> All payments for tournament participation must be processed through Razorpay to ensure secure transactions.</p>
      <p><strong>3.2.</strong> Refunds will only be issued in the event of tournament cancellation or technical issues beyond the participant's control.</p>
      <p><strong>3.3.</strong> Participants are responsible for any payment gateway charges.</p>
      <p><strong>3.4.</strong> A refund will deduct 2% of the transaction amount as a processing fee. For example, if the transaction amount is ₹100, the refund amount will be ₹98.</p>
      <h2>4. Tournament Rules</h2>
      <p><strong>4.1.</strong> Participants must adhere to the official rules of the respective games (BGMI, Valorant) as outlined by their developers.</p>
      <p><strong>4.2.</strong> Any use of cheats, hacks, or exploits will result in immediate disqualification and a ban from future tournaments.</p>
      <p><strong>4.3.</strong> BigGameWars reserves the right to make real-time decisions regarding match outcomes, disqualifications, or other disputes.</p>
      <h2>5. Prizes</h2>
      <p><strong>5.1.</strong> Prizes will be distributed within 7 working days after the conclusion of the tournament.</p>
      <p><strong>5.2.</strong> Winners are required to provide valid identification for prize verification.</p>
      <p><strong>5.3.</strong> BigGameWars is not responsible for incorrect bank or payment details provided by winners.</p>
      <h2>6. Code of Conduct</h2>
      <p><strong>6.1.</strong> Participants must maintain respectful behavior towards other players, organizers, and moderators.</p>
      <p><strong>6.2.</strong> Any form of harassment, hate speech, or disruptive behavior will lead to immediate expulsion.</p>
      <h2>7. Liabilities</h2>
      <p><strong>7.1.</strong> BigGameWars is not responsible for any technical issues, network failures, or disruptions caused by third-party platforms.</p>
      <p><strong>7.2.</strong> Participants are solely responsible for ensuring their devices and connections are tournament-ready.</p>
      <h2>8. Privacy</h2>
      <p><strong>8.1.</strong> Participant information will be collected and used solely for tournament purposes and will not be shared with third parties, except as required by law.</p>
      <p><strong>8.2.</strong> Payment information is processed securely through Razorpay, and BigGameWars does not store sensitive payment details.</p>
    </div>
  </div>
</body>
</html>`;
  res.send(htmlContent);
})
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
app.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/profile", protect , async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user data
    user.name = name || user.name;
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


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
  if (!acceptedTerms) {
    return res.status(403).send({ message: "You must accept terms to register." });
  }
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: "Username and Email are required" });
  }

  registrations.BGMI.push({ username, email });
  return res.status(200).json({ message: "Successfully registered for BGMI!" });
});

app.post("/register/valorant", (req, res) => {
  if (!acceptedTerms) {
    return res.status(403).send({ message: "You must accept terms to register." });
  }
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
