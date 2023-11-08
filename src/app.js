require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: [process.env.FRONTEND_URL, process.env.AUTH_URL],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/decode-token", (req, res) => {
  const jwtSession = req.cookies.__session

  console.log('Request Headers:', req.headers);

  if (!jwtSession) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(jwtSession, process.env.JWTKEY);

    // Here, you can access the decoded data, e.g., userId
    const username = decoded.username;

    // Perform actions with the decoded data as needed
    return res
      .status(200)
      .json({ message: "Token decoded successfully", username });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/api", function (req, res) {
  res.json({ message: "Backend without auth, hej ifrån workflow. :)" });
});

module.exports = app;
