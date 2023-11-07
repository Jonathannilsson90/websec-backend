require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: [process.env.FRONEND_URL, process.env.AUTH_URL],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/decode-token", (req, res) => {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWTKEY);

    // Here, you can access the decoded data, e.g., userId
    const userId = decoded.userId;

    // Perform actions with the decoded data as needed
    return res
      .status(200)
      .json({ message: "Token decoded successfully", userId });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/api", function (req, res) {
  res.json({ message: "Backend without auth, hej ifrån workflow. :)" });
});

module.exports = app;
