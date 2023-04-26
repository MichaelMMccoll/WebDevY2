const getAll =(id)=>{
    return fetch("http://localhost:3333/articles/"+ id +"/comments")
    .then((response)=>{
        if(response.status ===200){
            return response.json();
        }else{
            throw"Something went wrong"
        }
    })
    .then((resJson)=>{
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })
}
const DeleteComment =(id)=>{
    return fetch("http://localhost:3333/comments/"+ id,
    {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        }
    })
    .then((response)=>{
        if(response.status ===201){
            return response.json();
        }else if(response.status ===400){
            throw"Bad Request"

        }else if (response.status ===500){
            throw"Something went wrong"
        }
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })

}
const Newcomments =(id,comment_text)=>{
    return fetch("http://localhost:3333/articles/"+ id +"/comments",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "comment_text":comment_text
        })
    })
    .then((response)=>{
        if(response.status ===201){
            return response.json();
        }else if(response.status ===400){
            throw"Bad Request"

        }else if (response.status ===500){
            throw"Something went wrong"
        }
    })
    .then((resJson)=>{
        localStorage.setItem("comment_id",resJson.comment_id)
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })

}

export const commentsService ={
    getAll,
    Newcomments,
    DeleteComment
}