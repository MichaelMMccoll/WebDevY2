import{ createRouter, createWebHistory} from 'vue-router';

import Home from "../view/pages/Home.vue"
import Login from "../view/pages/Login.vue"
import Article from "../view/pages/Article.vue"
import Dashboard from "../view/pages/Dashboard.vue"
import NotFound from "../view/pages/NotFound.vue"
import NewArticle from "../view/pages/NewArticle.vue"
import Article_Lin from "../view/pages/Article_Lin.vue"
import UsersPage from "../view/pages/UsersPage.vue"




const ifAuthenticated =(to,from,next)=>{
    const loggedIn = localStorage.getItem('session_token');
    if(loggedIn){
        next()
        return
    }
    next('/login')
}
const routes = [
    // {path: "/dashboard",component:Dashboard,beforeEnter:ifAuthenticated},
    {path:"/", component: Home},
    {path:"/login", component: Login},
    {path:"/article/:id", component: Article},
    {path:"/articleLIN/:id", component: Article_Lin},
    {path:"/:dashboard",component: Dashboard, beforeEnter: ifAuthenticated},
    {path:"/NewArticle",component: NewArticle},
    {path:"/UsersPage",component: UsersPage},
    
    
    {path:"/pathMatch(.*)*",component:NotFound }
]

const router =createRouter({
    history: createWebHistory(),
    routes,
})
export default router;