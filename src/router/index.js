import { createRouter,createWebHashHistory } from "vue-router"
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: Login
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router