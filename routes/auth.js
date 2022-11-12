const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

const router = require("express").Router();

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

router.get("/signup", authController.getSignUp);

router.post(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter a valid email"),
    body(
      "password",
      "Password should be minimum 7 characaters and can only contain alphanumeric characters"
    )
      .isLength({ min: 7 })
      .isAlphanumeric(),
  ],
  authController.postSignUp
);

module.exports = router;
