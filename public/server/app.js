/**
 * Created by sumeetdubey on 6/20/17.
 */
module.exports = function(app, con) {
    //var userModel = require("./models/user.model.js")(con);
    var movieService = require("./services/movie.service.js")(app, con);
    var userService = require("./services/user.service.js")(app, con);
};