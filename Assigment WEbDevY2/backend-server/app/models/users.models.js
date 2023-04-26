const crypto = require("crypto");
const db=require("../../database");

const getHash = function(password, salt){
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
};
const addNewUser = (user,done)=>{
    const salt =crypto.randomBytes(64);
    const hash = getHash(user.password,salt);

    const  sql ='INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?,?,?,?,?)';
    let values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];
db.run(sql, values, function(err){
    if(err) return done (err)
    return done(null, this.lastID);
})

}

const getAllUsers=(done)=>{
    const results = [];

    db.each(
        "SELECT *FROM users",
        [],
        (err,row)=>{
            if(err) console.log("Something went wrong: "+ err);

            results.push({
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                email: row.email
            });
        },
        (err, num_rows)=>{
            return done(err,num_rows,results);
        }
    )


}

const authenticateUser =( email, password, done)=>{
    const sql ='SELECT user_id, password, salt FROM users WHERE email=?'

    db.get(sql,[email], (err,row)=> {
        if(err) return done(err)
        if(!row) return done(404)

        if(row.salt === null) row.salt=''

        let salt =Buffer.from(row.salt, 'hex')

        if(row.password === getHash(password, salt)){
            return done(false, row.user_id)
        }else{
            return done(404)
        }
    })
}

const setToken =(id, done)=> {
    let token = crypto.randomBytes(16).toString('hex');

    const sql='UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql, [token, id], (err) =>{
        return done(err,token)
    })
}

const getToken= (id,done)=>{
    const sql ='SELECT session_token FROM users WHERE user_id=?'

    db.get(sql, [id], (err, row) =>{
        if(err) return done(err)
        if(!row) return done(404)
        
        return done(false,row.session_token)

        

    })

}
const getIdFromToken=(token,done)=>{
    const sql ='SELECT user_id FROM users WHERE session_token=?'
    const params =[token]
    db.get(sql,params,(err,row)=>{
        if(err) return done(err)
        if(!row) return done(404)
        return done(false,row.user_id)
    })

}

const removeToken=(token, done)=>{
const sql ='UPDATE users SET session_token=null WHERE session_token=?'

db.run(sql, [token], (err)=>{
    return done(err)
})
}


module.exports={
    authenticateUser:authenticateUser,
    addNewUser:addNewUser,
    getToken:getToken,
    setToken:setToken,
    removeToken:removeToken,
    getIdFromToken:getIdFromToken,
    getAllUsers:getAllUsers
}
