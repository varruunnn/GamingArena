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
    matchesPlayed:{
      type:Number,
      default:0
    },
    moneyEarned:{
      type:Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);
const { v4: uuidv4 } = require('uuid');
const { type } = require("os");

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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms and Conditions</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h2>Terms and Conditions</h2>
    <p>These Terms and Conditions, along with the Privacy Policy and other applicable terms (“Terms”), constitute a binding agreement between BigGameWars (“Website Owner,” “we,” “us,” or “our”) and you (“you” or “your”) and govern your use of our website, services, and participation in our gaming tournaments (collectively, “Services”).</p>

    <p>By accessing or using our website and Services, you agree to have read, understood, and accepted these Terms (including the Privacy Policy). We reserve the right to update or modify these Terms at any time without prior notice. It is your responsibility to periodically review these Terms for updates.</p>

    <p>The use of our website or Services is subject to the following terms:</p>

    <h3>1. User Responsibilities</h3>
    <ul>
      <li>1.1. To access and use the Services, you must provide true, accurate, and complete information during registration and maintain it thereafter.</li>
      <li>1.2. You are solely responsible for all actions performed under your registered account. Keep your login credentials confidential and secure.</li>
      <li>1.3. You agree not to use the website or Services for any unlawful, illegal, or prohibited activities under these Terms or applicable laws.</li>
    </ul>

    <h3>2. Service Usage</h3>
    <ul>
      <li>2.1. We do not guarantee uninterrupted access to the Services and are not liable for any downtime, errors, or inaccuracies in the content.</li>
      <li>2.2. The Services are provided “as-is” and are solely for entertainment and gaming purposes. You must independently evaluate whether they meet your expectations.</li>
      <li>2.3. Unauthorized use of the website or Services may result in suspension of your account or other legal actions.</li>
    </ul>

    <h3>3. Payments and Refunds</h3>
    <ul>
      <li>3.1. Payments for tournament participation or other Services must be processed through our designated payment gateways to ensure secure transactions.</li>
      <li>3.2. Refunds are only issued in cases of technical failures, tournament cancellations, or our inability to provide the agreed-upon Service.</li>
      <li>3.3. Refund requests must be submitted within the stipulated timeframes as per our policies. Late requests will not be entertained.</li>
      <li>3.4. Refunds will incur a processing fee as per our refund policy.</li>
    </ul>

    <h3>4. Intellectual Property</h3>
    <ul>
      <li>4.1. All content, trademarks, and intellectual property on the website and in the Services are owned or licensed by BigGameWars.</li>
      <li>4.2. You agree not to copy, reproduce, distribute, or create derivative works from any part of our Services without prior written consent.</li>
    </ul>

    <h3>5. Liability and Disclaimer</h3>
    <ul>
      <li>5.1. BigGameWars does not provide any warranties regarding the accuracy, reliability, or completeness of the content or Services.</li>
      <li>5.2. You acknowledge that participation in gaming tournaments is at your own risk, and we are not liable for any loss or damages resulting from your use of our Services.</li>
      <li>5.3. BigGameWars will not be liable for any indirect, incidental, or consequential damages arising from the use of our Services.</li>
    </ul>

    <h3>6. Third-Party Links</h3>
    <ul>
      <li>6.1. Our website and Services may include links to third-party websites. BigGameWars is not responsible for the content, policies, or practices of these websites.</li>
      <li>6.2. Accessing third-party links will subject you to their respective terms and conditions.</li>
    </ul>

    <h3>7. Force Majeure</h3>
    <ul>
      <li>7.1. BigGameWars shall not be held liable for any failure to perform obligations due to events beyond our reasonable control, including but not limited to natural disasters, technical failures, or acts of government.</li>
    </ul>

    <h3>8. Dispute Resolution</h3>
    <ul>
      <li>8.1. All disputes arising out of or related to these Terms shall be resolved through amicable discussions. In case of no resolution, the matter will be addressed as per applicable online dispute resolution mechanisms.</li>
      <li>8.2. These Terms shall be governed by and construed in accordance with the laws applicable to online agreements.</li>
    </ul>

    <h3>9. Contact Us</h3>
    <p>For any questions or concerns regarding these Terms or the Services, please contact us through the contact form available on our website.</p>

    <p>By continuing to use our website or Services, you acknowledge and agree to these Terms.</p>
  </div>

  <footer>
    <p>&copy; 2024 BigGameWars. All Rights Reserved.</p>
  </footer>
</body>
</html>
`;
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

    res.json({
      name: user.name,
      email: user.email,
      matchesPlayed: user.matchesPlayed,
      moneyEarned: user.moneyEarned
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.put("/profile", protect, async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Name cannot be empty" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name;
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/terms&conditions', (req, res) => {
  res.sendFile(__dirname + '/terms&conditions.html');
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