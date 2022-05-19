<template>
    <el-row>
        <el-col :span="9"></el-col>
        <el-col :span="6">
            <el-card>
                <img class="login-image" src='../assets/register.png' alt="登录图标" >
                <el-input v-model="username" placeholder="Please input username"/>
                <el-input v-model="password" placeholder="Please input password"/>
                <el-button type="primary" round @click="register">Register</el-button>
            </el-card>
        </el-col>
        <el-col :span="9"></el-col>
    </el-row>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: "Register",
    setup(props,context){
        const username = ref('')
        const password = ref('')
        const router = useRouter()

        const register = ()=>{
            const isCanRegister = (username,password) =>{
                //TODO
                return true
            }
            if(isCanRegister(username.value,password.value)){
                router.push('/login')
            }
        }

        return {
            username,
            password,
            register
        }
    }
}
</script>

<style scoped>
.el-input{
    margin-top: 20px;
    height: 60px;
    font-size: 20px;
}

.el-button{
    margin-top: 20px;
    height: 60px;
    width: 100px;
    font-size: 20px;
}
.el-card{
    position: relative;
    top: 20%;
    border-radius: 15px;
    text-align: center;
}
.login-image{
    width: 150px;
    height: 150px;
}
</style>