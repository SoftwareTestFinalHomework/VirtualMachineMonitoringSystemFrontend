import { createRouter,createWebHashHistory } from "vue-router"
import Login from '../components/Login.vue'

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
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router