const comments=require("../models/comments.models")
const users = require("../models/users.models");

const Joi = require("joi");
const articles = require("../models/articles.models");

const Newcomments=(req,res)=>{
    let article_id=parseInt(req.params.article_id);
    console.log(article_id)
    articles.getSingleArticle(article_id,(err)=>{
        console.log(article_id)
        if(err === 404) return res.sendStatus(404)
    
        if(err) return res.sendStatus(500)
    
    const schema =Joi.object({
        "comment_text":Joi.string().required()
    })
    
    const{ error } =schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    let comment=req.body.comment_text;
    console.log(comment)
 
    comments.addNewComment(comment,article_id,(err,id)=>{
        console.log(article_id);
        
        if(err) return res.sendStatus(500);
       
        return res.status(201).send({comment_id: id})
        
    })

    })

}



const getCom =(req, res)=>{
    let article_id=parseInt(req.params.article_id);
    articles.getSingleArticle(article_id,(err)=>{
        
        if(err === 404) return res.sendStatus(404)
    
        if(err) return res.sendStatus(500)
    })
    comments.getComment(article_id,(err,num_rows,rcomment)=>{
        // console.log(results)
        if(err) return res.sendStatus(500)

        
    return res.status(200).send(rcomment);
    
})
}


const deleteComment=(req,res)=>{
    let comment_id=parseInt(req.params.comment_id);
    comments.getSingleComment(comment_id,(err)=>{
        if(err === 404) return res.sendStatus(404)

        if(err) return res.sendStatus(500)
    
    comments.deleteComment(comment_id,(err)=>{
        if(err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)
        
    })
    return res.sendStatus(200)
})
    
}



module.exports={
    Newcomments:Newcomments,
    getCom:getCom,
    deleteComment:deleteComment
}