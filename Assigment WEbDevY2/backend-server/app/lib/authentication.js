const users = require("../models/users.models");

const isAuthenticated = function(req,res,next){
    let token=req.get('X-Authorization');

    users.getIdFromToken(token, (err, id)=>{
        if(err|| id===null){
            return res.sendStatus(401);
        }
        next();
    });
};


const validateId = id => {
    let _id = parseInt(id); // force to integer returns NaN if not
    return Number.isInteger(_id) && (_id > 0) // big fat assumption that ids start at 1, not 0 (ok for standard mysql autoincrements)
};
module.exports={
    isAuthenticated:isAuthenticated,
    validateId:validateId
}