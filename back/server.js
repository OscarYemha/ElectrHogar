require("dotenv").config();
const express = require("express");
const parser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./api/db/db");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./api/Routes");
const { User, Category, Product, Cart, CartProductQuantity } = require("./api/Models/index");

const app = express();
app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }
            done(null, user);
          });
        })
        .catch(done);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({
        where: {
          email: profile.emails[0].value,
        },
      }).then((user) => {
        if (!user) {
          User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: profile.id,
          }).then((user) => {
            cb(null, user);
          });
        } else {
          cb(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use("/api", routes);
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

db.sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => console.log(`listening on ${process.env.PORT || 3001}...`));
  });

module.exports = app;
