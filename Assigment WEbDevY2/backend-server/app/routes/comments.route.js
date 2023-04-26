const comments = require("../controllers/comments.controllers");
const auth =require("../lib/authentication");


module.exports = function(app){

 
    app.route("/articles/:article_id/comments")
    .post(comments.Newcomments)
    .get(comments.getCom);
    
    app.route("/comments/:comment_id")
    .delete(auth.isAuthenticated,comments.deleteComment);
}