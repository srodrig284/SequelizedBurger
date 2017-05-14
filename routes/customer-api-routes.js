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
    app.get("/api/customers", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Customer.findAll({}).then(function(dbCustomer) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbCustomer);
        });
    });

    // POST route for saving a new burgers
    app.post("/api/addcustomer", function(req, res) {
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.Customer.create({
            customer_name: req.body.customername
        }).then(function(dbCustomer) {
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

    // DELETE route for deleting customers. We can get the id of the customers to be deleted from
    // req.params.id
    app.post("/api/deletecustomer", function(req, res) {
        // We just have to specify which burger we want to destroy with "where"
        console.log("cust ID: ", req.body.customerID);
        db.Customer.destroy({
            where: {
                id: req.body.customerID
            }
        }).then(function(dbCustomer) {
            res.redirect("/");
        });
    });
};
