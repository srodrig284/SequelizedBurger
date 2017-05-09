// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
      // GET route for getting all of the burgers
          db.Burger.findAll({}).then(function(dbBurger) {
              // We have access to the todos as an argument inside of the callback function
              var hbsObject = {
                  burgers: dbBurger
              };
              console.log(hbsObject);
              res.render("index", hbsObject);
          });
  });

};
