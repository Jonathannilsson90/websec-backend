const express = require("express");
const port = process.env.PORT || 3001;
const cors = require('cors')
const helmet = require('helmet')
const app = express ();

app.use(cors())
app.use(helmet())
app.use(express.json());


app.get ("/api", function (req, res) {
    res.json({message : "Backend without auth, hej ifrån workflow. :)"}) 
})

app.listen(port, () => console.log("Server listen on port " + port))

