const getAllUsers =()=>{
    return fetch("http://localhost:3333/users",
    {
        method:"GET",
        headers:{
        "X-Authorization":localStorage.getItem("session_token")
        }
    })
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
const NewUser =(first_name,last_name,email,password)=>{
    return fetch("http://localhost:3333/users",
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "X-Authorization":localStorage.getItem("session_token")
        },
        body:JSON.stringify({
            "first_name":first_name,
            "last_name":last_name,
            "email":email,
            "password":password    
        })
    })
    .then((response)=>{
        if(response.status ===200){
            return ;
        }else if(response.status ===400){
            throw"Bad Request"

        }else if (response.status ===500){
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


export const userServices ={
    getAllUsers,
    NewUser
}