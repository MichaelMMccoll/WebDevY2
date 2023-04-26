const users = require("../controllers/users.controllers");
const auth =require("../lib/authentication")


module.exports = function(app){

    app.route("/users")
    .post(auth.isAuthenticated,users.addNewUser)
    .get(auth.isAuthenticated,users.getAllUsers);

    app.route("/login")
    .post(users.authenticateUser);

    app.route("/logout")
    .post(auth.isAuthenticated,users.logout);
}