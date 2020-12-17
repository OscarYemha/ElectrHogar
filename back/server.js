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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    origin: true,
  }),
);
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: "electroghogar",
    resave: true,
    saveUninitialized: true,
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
      clientID: "410671063704641",
      clientSecret: "87f37475cab65bc6197ac53e4f377fbe",
      callbackURL: "http://localhost:1000/api/auth/facebook/callback",
      profileFields: ["email", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("profile = ", profile);

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
  console.log("Entro al serialize", user.id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log("Entro al deserialize", user.id)
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use("/api", routes);
app.use("/*", (req, res) => {
  res.redirect("/api");
});

db.sync({ force: false })
  // Product.sync({}).then(()=>{Category.sync}).then(()=>{User.sync}).then(()=>{Cart.sync}).then(()=>{CartProductQuantity.sync})
  .then(() => {
    app.listen(1000, () => console.log("listening on 1000..."));
  });

module.exports = app;
