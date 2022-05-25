<template>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="1">
            <img src="../assets/virtualMachine.png" alt="System Logo">
            <span>Virtual Machine Monitoring System</span>
        </el-menu-item>
        <el-menu-item index="2">Homepage</el-menu-item>
<!--        <el-menu-item index="3">Log</el-menu-item>-->
<!--        <el-menu-item index="4">Register</el-menu-item>-->
    </el-menu>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from "vue-router"

export default {
    name: "NavBar",
    setup(props,context){
        const activeIndex = ref('')
        const router = useRouter()
        const handleSelect = (index) =>{
            if(index === '2'){
                router.push('/')
            }
            // else if(index === '3'){
            //     router.push('/login')
            // }else if(index === '4'){
            //     router.push('/register')
            // }
        }
        return {
            activeIndex,
            handleSelect
        }
    }
}
</script>

<style scoped>
img{
    width: 70px;
    height: 70px;
}
.el-menu-item{
    height: 70px !important;
    font-size: 20px;
}
</style>