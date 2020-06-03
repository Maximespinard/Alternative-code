// imports and consts
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DB = "mongodb://localhost/alternative-code";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
let date = new Date();

// connexion à la bdd
mongoose
  .connect(process.env.MONGODB_URI || DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("successfully connected db"));

// middleware
app.use(cors());
app.use(bodyParser.json());

const secret = "JulRpz";
app.use(
  expressJwt({ secret: secret }).unless({
    path: [
      "/api/auth",
      "/api/user/add",
      "/api/user/update",
      "/api/user/delete",
      "/api/contact",
      "/api/contact/rdv",
      "/api/comment/add",
      "/api/comment",
      /^\/api\/comment\/.*/,
      "/api/upload",
    ],
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

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
    avatar: {
      type: String,
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

const Users = mongoose.model("users", usersSchema);
const comments = mongoose.model("comments", comment);

// route en post pour créer un user
app.post("/api/user/add", (req, res) => {
  const { email, firstname, username, password } = req.body;
  if (firstname === "") {
    const user = new Users({
      email,
      username,
      password: bcrypt.hashSync(password, 10),
      avatar: "null",
    });

    user.save((err, resp) => {
      if (err) {
        res.status(400).send({ error: ` Une erreur est survenue ${err}` });
      } else {
        res.status(200).send({ response: "Votre compte a bien été créé " });
      }
    });
  } else {
    res.status(401);
  }
});

// route en post pour login
app.post("/api/auth", (req, res) => {
  const { email, firstname, password } = req.body;
  if (firstname === "") {
    Users.findOne({ email }, (err, user) => {
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
  } else {
    res.status(401);
  }
});

// route en get pour récuperer l'user connecté
app.get("/api/user/:id", (req, res) => {
  Users.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.status(200).send({ response: user });
    }
  });
});

// route en post pour modifier les données d'un user
app.put("/api/user/update", (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.body.id },
    { email: req.body.email, username: req.body.username },
    (err) => {
      if (err) {
        res.status(400).send({ error: ` Une erreur est survenue ${err}` });
      } else {
        res.status(200).send({ response: "Modifications prises en compte" });
      }
    }
  );
});

// route en post pour delete un user
app.post("/api/user/delete", (req, res) => {
  const { id } = req.body;
  Users.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(400).send({ error: "Une erreur est survenue" });
    } else {
      res.status(200).send({
        response: "Votre compte a bien été supprimé, vous allez être redirigé",
      });
    }
  });
});

// --------------- COMMENTS ------------------------
//get
app.get("/api/comment", (req, res) => {
  comments.find({}, (err, resp) => {
    if (err) {
      res.status(400).send({ error: ` Une erreur est survenue ${err}` });
    } else {
      res.status(200).send(resp);
    }
  });
});

//post
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
        res.status(400).send({ error: ` Une erreur est survenue ${err}` });
      } else {
        res.status(200).send({ response: "Merci pour votre commentaire" });
      }
    });
  } else {
    res.status(401).send("ROBOT");
  }
});

//delete
app.delete("/api/comment/:id", (req, res) => {
  const id = req.params.id;
  comments.deleteOne({ _id: id }, (err) => {
    if (err) {
      res.status(400).send({ error: ` Une erreur est survenue ${err}` });
    } else {
      res.status(200).send("Comment deleted success");
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
      return console.log({ error: ` Une erreur est survenue ${err}` });
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
      return console.log({ error: ` Une erreur est survenue ${err}` });
    }
  });
  res.status(200).send({
    response: "Rendez-vous validé",
  });
});

app.put("/api/upload", (req, res) => {
  const { id, avatar } = req.body;
  Users.findOneAndUpdate({ _id: id }, { avatar: avatar }, (err) => {
    if (err) {
      res.status(400);
    } else {
      res.status(200).send({ response: "Avatar bien enregistrer" });
    }
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
