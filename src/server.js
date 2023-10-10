const express = require("express");
const port =process.env.POST || 3001;

const app = express ();

app.use (express.json());


app.get ("/api", function (req, res) {
    res.json({message : "Backend without auth"}) 
})

app.listen(port, () => console.log("Server listen on port " + port))

