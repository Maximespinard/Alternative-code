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
const nodemailer = require("nodemailer");
let date = new Date();

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
    path: [
      "/api/auth",
      "/api/user/add",
      "/api/contact",
      "/api/contact/rdv",
      "/api/comment/add",
      "/api/comment",
      "/api/comment/:id",
    ],
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
    createdAt: {
      type: String,
    },
  },
  { collection: "users" }
);

const comment = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: String,
    },
  },
  { collection: "comments" }
);

const users = mongoose.model("users", usersSchema);
const comments = mongoose.model("comments", comment);

// route en post pour créer un user
app.post("/api/user/add", (req, res) => {
  const { email, username, password } = req.body;
  const user = new users({
    email,
    username,
    password: bcrypt.hashSync(password, 10),
  });

  user.save((err, resp) => {
    if (err) {
      res.status(400).send("PROBLEME");
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
app.get("/api/user/:id", (req, res) => {
  users.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.status(200).send({ response: user });
    }
  });
});

// --------------- COMMENTS ------------------------
app.get("/api/comment", (req, res) => {
  comments.find({}, (err, resp) => {
    if (err) {
      res.status(400).send("Une erreur s'est produite");
    } else {
      res.status(200).send(resp);
    }
  });
});

app.post("/api/comment/add", (req, res) => {
  const { email, username, message, stars, firstname } = req.body;
  if (firstname === "") {
    const comm = new comments({
      email,
      username,
      message,
      stars,
      createdAt: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    });
    comm.save((err, resp) => {
      if (err) {
        res.status(400).send("PROBLEME");
      } else {
        res.status(200).send({ response: "Merci pour votre commentaire" });
      }
    });
  } else {
    res.status(401).send("ROBOT");
  }
});

app.delete("/api/comment/:id", (req, res) => {
  const id = req.params.id;
  Member.findByIdAndDelete(id, (err, user) => {
    if (err || !user) {
      res.status(400).send({
        error: true,
        message: "User not found",
      });
    } else {
      res.status(200).send({
        user: user,
      });
    }
  });
});

// ---------------NODEMAILER --------------------
let transporter = nodemailer.createTransport({
  host: "mail.alternative-code.com",
  port: 465,
  secure: true,
  auth: {
    user: "chris@alternative-code.com",
    pass: "Reactjs13",
  },
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  const htmlEmail = `
  <h1>Contact via formulaire</h1>
  <p>Name : ${name}</p>
  <p>Email : ${email}</p>
  <p>Message : ${message}</p>
  `;

  let mailOption = {
    from: "chris@alternative-code.com",
    to: "chris@alternative-code.com",
    replyTo: "chris@alternative-code.com",
    subject: "Formulaire",
    text: message,
    html: htmlEmail,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      return console.log("Erreur : ", err);
    }
  });
  res.status(200).send({
    response: "Formulaire envoyé",
  });
});

app.post("/api/contact/rdv", (req, res) => {
  const { name, number, datetime } = req.body;
  const htmlEmail = `
  <h1>Prise de rendez-vous</h1>
  <p>Name : ${name}</p>
  <p>Number : ${number}</p>
  <p>Date and hour : ${datetime}</p>
  `;

  let mailOption = {
    from: "chris@alternative-code.com",
    to: "chris@alternative-code.com",
    replyTo: "chris@alternative-code.com",
    subject: "Rendez-Vous",
    html: htmlEmail,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      return console.log("Erreur : ", err);
    }
  });
  res.status(200).send({
    response: "Rendez-vous validé",
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
