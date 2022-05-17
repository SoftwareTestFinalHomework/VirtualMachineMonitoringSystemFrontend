<template>
    <el-row>
        <el-col :span="8"></el-col>
        <el-col :span="8">
            <el-card>
                <img class="login-image" src='../assets/login.png' alt="登录图标" >
                <el-input v-model="username" placeholder="请输入用户名" />
                <el-input v-model="password" placeholder="请输入密码" show-password/>
                <el-button type="primary" round @click="login">登录</el-button>
            </el-card>
        </el-col>
        <el-col :span="8"></el-col>
    </el-row>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: "Login",
    setup(props,context){
        const router = useRouter()
        const username = ref('')
        const password = ref('')
        const login = () =>{
            const isUsernameAndPasswordCorrect = (username,password) =>{
                //TODO 需要使用axios连接后端服务器
                return true
            }

            console.log(username.value)
            console.log(password.value)
            if(isUsernameAndPasswordCorrect(username.value,password.value)){
                router.push('/')
            }
        }

        return {
            username,
            password,
            login
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
}
.login-image{
    width: 100px;
    height: 100px;
}
</style>