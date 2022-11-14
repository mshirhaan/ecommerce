const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

const User = require("../model/user");

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("login", {
    path: "/login",
    errorMessage: message,
    oldInput: { email: req.body.email, password: req.body.password },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  //go to db, check valid email password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("login", {
      path: "/login",
      errorMessage: errors.array()[0].msg,
      oldInput: { email: req.body.email, password: req.body.password },
      validationErrors: errors.array(),
    });
  }
  User.findAll({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user[0]) {
      bcrypt.compare(req.body.password, user[0].password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user[0];
          res.redirect("/products");
        } else {
          return res.status(422).render("login", {
            path: "/login",
            errorMessage: "Invalid email or password",
            oldInput: { email: req.body.email, password: req.body.password },
            validationErrors: [],
          });
        }
      });
    } else {
      return res.status(422).render("login", {
        path: "/login",
        errorMessage: "Invalid email or password",
        oldInput: { email: req.body.email, password: req.body.password },
        validationErrors: [],
      });
    }
  });
};

exports.getLogout = (req, res) => {
  // const error =  new Error('simply')
  // error.httpStatusCode = 500;
  // return next(error)
  req.session.destroy();
  res.redirect("/products");
};

exports.getSignUp = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("signup", {
    path: "/signup",
    errorMessage: message,
    oldInput: { email: "", password: "" },
    validationErrors: [],
  });
};

exports.postSignUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("signup", {
      path: "/signup",
      errorMessage: errors.array()[0].msg,
      oldInput: { email: req.body.email, password: req.body.password },
      validationErrors: errors.array(),
    });
  }
  bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
    return User.create({
      email: req.body.email,
      password: hashedPassword,
    }).then((result) => {
      res.redirect("/login");
    });
  });
};
