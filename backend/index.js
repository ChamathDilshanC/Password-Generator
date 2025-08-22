require("dotenv").config();

const express = require("express");
const cors = require("cors");

// In-memory storage for demo (replace with real database later)
let passwordHistory = [];

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Password Generator Backend is running");
});

// Password generation endpoint (to be implemented)
app.post("/generate", (req, res) => {
  const {
    length = 12,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
  } = req.body;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let charSet = "";
  if (uppercase) charSet += upperChars;
  if (lowercase) charSet += lowerChars;
  if (numbers) charSet += numberChars;
  if (symbols) charSet += symbolChars;

  if (!charSet) {
    return res.status(400).json({ error: "No character types selected." });
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  // Password strength evaluation
  function evaluateStrength(pw) {
    let score = 0;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
  }

  res.json({
    password,
    strength: evaluateStrength(password),
  });
});

// Save generated password to in-memory storage (no auth for demo)
app.post("/save", async (req, res) => {
  const { password, strength } = req.body;
  try {
    console.log("Saving password:", password, "with strength:", strength);
    const passwordEntry = {
      id: Date.now().toString(), // Simple ID
      password,
      strength,
      createdAt: { seconds: Math.floor(Date.now() / 1000) },
    };
    passwordHistory.unshift(passwordEntry); // Add to beginning
    // Keep only last 10 passwords
    if (passwordHistory.length > 10) {
      passwordHistory = passwordHistory.slice(0, 10);
    }
    console.log("Password saved successfully");
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving password:", error);
    res.status(500).json({ error: "Failed to save password" });
  }
});

// Get password history from in-memory storage
app.get("/history", async (req, res) => {
  try {
    console.log(`Returning ${passwordHistory.length} passwords from history`);
    res.json({ history: passwordHistory });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.json({ history: [] });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
