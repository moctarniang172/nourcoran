require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/conf.config");

const {createTableUser} = require("./models/User.model");


createTableUser();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/"));

app.get('/', (req,res) => {
    res.json({message: " le serveur a bien demarrer  "})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port: http://localhost:${PORT}`);
})

module.exports = app;