const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");
const User = require("../model/user");

const router = require("express").Router();

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password", "Password enter valid password")
      .isLength({ min: 7 })
      .trim(),
  ],
  authController.postLogin
);

router.get("/logout", authController.getLogout);

router.get("/signup", authController.getSignUp);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findAll({
          where: {
            email: value,
          },
        }).then((user) => {
          if (user[0]) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Password should be minimum 7 characaters and can only contain alphanumeric characters"
    )
      .isLength({ min: 7 })
      .trim(),
  ],
  authController.postSignUp
);

module.exports = router;
