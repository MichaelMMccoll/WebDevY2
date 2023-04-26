const getAll =()=>{
    return fetch("http://localhost:3333/articles")
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
 const getOne=(id)=>{
    return fetch("http://localhost:3333/articles/" + id)
    .then((response)=>{
        if(response.status ===200){
            return response.json();
        }else{
            console.log()
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

 const NewArticle =(title,article_text,author)=>{
    return fetch("http://localhost:3333/articles",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body:JSON.stringify({
            "title":title,
            "article_text":article_text,
            "author":author    
        })
    })
    .then((response)=>{
        if(response.status ===200){
            return response.json();
        }else if(response.status ===400){
            throw"Bad Request"

        }else if (response.status ===500){
            throw"Something went wrong"
        }
    })
    .then((resJson)=>{
        //localStorage.setItem("article_id",resJson.article_id)
        return resJson
    })
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })

}
const DeleteArticle=(id)=>{
    return fetch("http://localhost:3333/articles/" + id,
    {
        method:"DELETE",
        headers:{
            "X-Authorization":localStorage.getItem("session_token")
        }
    })
    .then((response)=>{
        if(response.status ===200){
            return ;
        }else {
            throw"Something went wrong"
        }
    })
    
    
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })

 }
 
 const PatchArticle=(id,title,author,article_text)=>{
    return fetch("http://localhost:3333/articles/" + id,
    {
        method:"PATCH",
        headers:{
            'Content-Type': 'application/json',
            "X-Authorization":localStorage.getItem("session_token")
        },
        body:JSON.stringify({
            "title":title,
            "author":author,
            "article_text":article_text    
        })
    })
    .then((response)=>{
        if(response.status ===200){
            return console.log("Working");
        }else {
            throw"Something went wrong"
        }
    })
    
    .catch((error)=>{
        console.log("Err", error)
        return Promise.reject(error)
    })

 }


export const articleService ={
    getAll,
    getOne,
    DeleteArticle,
    PatchArticle,
    NewArticle
}