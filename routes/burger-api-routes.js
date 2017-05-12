// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the burgers
    app.get("/api/burgers", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Burger.findAll({}).then(function(dbBurger) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbBurger);
        });
    });

    // POST route for saving a new burgers
    app.post("/api/addburger", function(req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
         console.log("burger name: ", req.body);
        db.Burger.create({
            burger_name: req.body.burgername
        }).then(function(dbBurger) {
            // We have access to the new burger as an argument inside of the callback function
            res.redirect("/");

        }).catch(function  (error){
            //console.log("Error Message = ", error.message);
            return res.render('error', {
                message: error.message,
                error: error
            });
        });
    });

    // DELETE route for deleting burgers. We can get the id of the burger to be deleted from
    // req.params.id
    app.post("/api/delete/:id", function(req, res) {
        // We just have to specify which burger we want to destroy with "where"
        db.Burger.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBurger) {
            res.redirect("/");
        });

    });

    // UPDATE route for deleting burgers. We can get the id of the burger to be deleted from
    // req.params.id
    app.post("/api/update/:id", function(req, res) {
        var devoured_condition = req.body.devoured;
        var customerID;
        console.log("devoured = ", req.body.devoured);
        if(req.body.devoured)
        {
            customerID = req.body.CustomerId;
        }
        console.log("customerID = ", customerID);

        // We just have to specify which burger we want to update with "where"
        db.Burger.update({
            devoured: req.body.devoured,
            CustomerId: customerID
            },
            {
            where: {
                id: req.params.id
            }
        }).then(function(dbBurger) {
            res.redirect("/");
        });

    });
};
