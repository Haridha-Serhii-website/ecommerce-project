// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "ecommerce-project";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;


app.use((req, res, next) => {
    console.log("custom middleware 1.....")
      // Make `user` and `authenticated` available in templates
      res.locals.userInSession = req.session.currentUser
     // res.locals.authenticated = !req.user.anonymous
      next()
})

    
// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const productsRoutes = require("./routes/product.routes");
app.use("/", productsRoutes);

const ordersRoutes = require("./routes/order.routes");
app.use("/", ordersRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
