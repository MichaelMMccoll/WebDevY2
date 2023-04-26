
const Joi = require('joi');
const users = require("../models/users.models");



const authenticateUser=(req,res)=>{
    const schema =Joi.object({
        "email":Joi.string().email().required(),
        "password":Joi.string().min(3).max(30).required()
    })

    const {error}= schema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }else{
        let user =Object.assign({},req.body);
    
    users.authenticateUser(req.body.email,req.body.password,(err,id)=>{
        
        if(err===404) return res.status(400).send("Invalid email/password supplied")
        if(err) return res.sendStatus(500);

        users.getToken(id,(err,token)=>{
            console.log(token)
            if (err) return res.sendStatus(500);

            if(token){
                return res.status(200).send({user_id:id, session_token:token})
            }else{
                users.setToken(id, (err, token)=>{
                    if(err) return res.sendStatus(500)
                    return res.status(200).send({user_id:id, session_token:token})
                })
            }
        })
    })}


}

const logout=(req,res)=>{
    let token=req.get('X-Authorization');
    console.log(token)
    users.removeToken(token,(err)=>{
        if(err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)
        
    })
    
    return res.sendStatus(200)
}


const getAllUsers=(req,res)=>{
    users.getAllUsers((err,num_rows,results)=>{
        console.log(results);
        if(err) return res.sendStatus(500);

        
    return res.status(200).send(results);
    })
}

const addNewUser=(req,res)=>{

    const schema =Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(8).max(12)
        .regex(/[A-Z]/)
        .regex(/[a-z]/)
        .regex(/[.?!@#$%^&*()_+-=]/)
        .regex(/[0-9]/)
        .required()
    })

    
    const{ error } =schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user=Object.assign({},req.body);

    users.addNewUser(user,(err,id)=>{
        console.log(err);
        if(err) return res.sendStatus(500);
       

        return res.status(201).send({user_id: id})
    })
}

module.exports ={
    addNewUser:addNewUser,
    authenticateUser:authenticateUser,
    logout:logout,
    getAllUsers:getAllUsers
}