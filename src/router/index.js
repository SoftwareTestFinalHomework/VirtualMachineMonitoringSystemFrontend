import { createRouter,createWebHashHistory } from "vue-router"
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import HomePage from "../components/HomePage.vue";
import CreateServerPage from "../components/CreateServerPage.vue";
import DestroyServerPage from "../components/DestroyServerPage.vue";
import CreateVirtualMachinePage from "../components/CreateVirtualMachinePage.vue";
import DestroyVirtualMachinePage from "../components/DestroyVirtualMachinePage.vue";
import ServersStatistics from "../components/ServersStatistics.vue";
import VirtualMachinesStatistics from "../components/VirtualMachinesStatistics.vue";
import DisplayList from "../components/DisplayList.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        children:[
            {
                path: 'createServer',
                name: 'createServer',
                component: CreateServerPage
            },
            {
                path: 'destroyServer',
                name: 'destroyServer',
                component: DestroyServerPage
            },
            {
                path: 'createVirtualMachine',
                name: 'createVirtualMachine',
                component: CreateVirtualMachinePage
            },
            {
                path: 'destroyVirtualMachine',
                name: 'destroyVirtualMachine',
                component: DestroyVirtualMachinePage
            },
            {
                path: 'serverStatistic',
                name: 'serverStatistic',
                component: ServersStatistics
            },
            {
                path: 'virtualMachineStatistic',
                name: 'virtualMachineStatistic',
                component: VirtualMachinesStatistics
            },
            {
                path: 'displayList',
                name: 'displayList',
                component: DisplayList
            }
        ]
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