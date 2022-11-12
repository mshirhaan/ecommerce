const express = require("express");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const csrf = require("csurf");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

const db = require("./util/database");
const sequelize = require("./util/database");
const Product = require("./model/product");
const User = require("./model/user");
const path = require("path");

const store = new SequelizeStore({ db: sequelize });

const csrfProtection = csrf();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  if(req.session && req.session.user) {
    res.locals.email = req.session.user.email
  } else {
    res.locals.email = null
  }
  
  next();
});

app.use(flash());

app.use(userRoutes);
app.use(productRoutes);
app.use(authRoutes);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

sequelize
  .sync()  
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));