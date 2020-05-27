// imports and consts
const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DB = "mongodb://localhost/alternative-code";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// connexion à la bdd
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("successfully connected to alternative-code db"));

// middleware
app.use(cors());
app.use(bodyParser.json());

const secret = "JulRpz";
app.use(
  expressJwt({ secret: secret }).unless({
    path: ["/api/auth", "/api/user/add"],
  })
);

const usersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

const users = mongoose.model("users", usersSchema);

// route en post pour créer un user
app.post("/api/user/add", (req, res) => {
  const { email, username, password } = req.body;
  const user = new users({
    email,
    username,
    password: bcrypt.hashSync(password, 10),
  });
  user.save((err) => {
    if (err) {
      res.status(400).send({ error: `Une erreur est survenue ${err}` });
    } else {
      res.status(200).send({ response: "Votre compte a bien été créé " });
    }
  });
});

// route en post pour login
app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;
  users.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).send({ error: ` Une erreur est survenue ${err}` });
    }
    if (!user) {
      res
        .status(501)
        .send({ error: `Aucun compte n'existe avec cette adresse email` });
    } else {
      const hash = user.password;
      bcrypt.compare(password, hash, (err, result) => {
        if (result === true) {
          const myToken = jwt.sign(
            {
              iss: "alternative-code.com",
              user,
            },
            secret
          );
          res.status(200).send({ token: myToken, id: user._id });
        } else {
          res.status(500).send({ error: "Mot de passe incorrect" });
        }
      });
    }
  });
});

// route en get pour récuperer l'user connecté 
app.get('/api/user/:id', (req, res) => {
  users.findOne({_id: req.params.id}, (err, user) => {
    if (err) {
      res.status(400).send({error: err})
    } else {
      res.status(200).send({response: user})
    }
  })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
