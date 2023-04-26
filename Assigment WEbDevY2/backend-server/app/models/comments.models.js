const db=require("../../database");
const Filter=require("bad-words-jd")



const addNewComment = (comment,article_id,done)=>{
let date= Date.now();
    const  sql ='INSERT INTO comments (date_published,article_id, comment_text) VALUES (?,?,?)';
    
    let values = [date,article_id,comment];
    console.log(sql)
    db.run(sql, values, function(err){
    
    if(err) return done (err)
    return done(null, this.lastID);
})

}

const getSingleComment =(id,done)=>{
    const sql ='SELECT * FROM comments WHERE comment_id=?'

    db.get(sql, [id], (err,row)=>{
        if(err) return done(err)
        if(!row) return done(404)

        return done(null,{
           
            comment_id: row.comment_id,
           })
    })
    
}



const getComment =(id,done)=>{
    const rcomment= [];
    let planeemoji= new Filter({placeHolder:'✈️'});
let sql='SELECT * FROM comments WHERE article_id=?'
        
    db.each(sql,
        [id],
        (err,row)=>{
            if(err) console.log("Something went wrong: "+ err);
            if(!row) return done(404);
            console.log(row.comment_id)

            rcomment.push({
                article_id:row.article_id,
                comment_id: row.comment_id,
                date_published: new Date(row.date_published).toLocaleDateString(),
                comment_text: planeemoji.clean(row.comment_text)
            });
        },
        (err, num_rows)=>{
            return done(err,num_rows,rcomment);
        }
    )
}
const deleteComment= (id, done)=>{

    const sql='DELETE FROM comments WHERE comment_id=?'

    db.run(sql,[id],(err)=>{
        if(err) return done(err)
    })

}


module.exports={
addNewComment:addNewComment,
getComment:getComment,
deleteComment:deleteComment,
getSingleComment:getSingleComment
}