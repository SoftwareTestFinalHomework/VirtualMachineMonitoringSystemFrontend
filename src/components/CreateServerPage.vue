<template>
    <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-input v-model="serverIP" placeholder="You must use IPv4 address" clearable>
                <template #prepend>Please Input Server's IP</template>
            </el-input>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
    <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-input maxlength="25"
                      v-model="serverName"
                      placeholder="Server's name can not longer than 25 characters"
                      clearable
                      show-word-limit>
                <template #prepend>Please Input Server's Name</template>
            </el-input>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-button type="primary" @click="checkConnection">
                Check Connection
            </el-button>
            <el-button type="primary" @click="createServer">
                Create Server
            </el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script>
import { ref } from 'vue'
import axios from "axios"
import Cookies from 'js-cookie'
import { ElMessageBox } from "element-plus";
export default {
    name: "CreateServerPage",
    setup(props,context){
        const serverIP = ref('')
        const serverName = ref('')
        const checkConnection = () =>{
            axios({
                method: 'get',
                url: 'http://'+ serverIP.value +':8000/checkConnection'
            }).then((response)=>{
                if(response.data.status === 'success'){
                    ElMessageBox.alert('Connect server successfully', 'Tip', {
                        confirmButtonText: 'OK',
                    })
                }
            }).catch((error)=>{
                console.log(error)
            })
        }

        const createServer = () =>{
            axios({
                method: 'get',
                url: 'http://'+ serverIP.value +':8000/addServer?ip=' + serverIP.value
            }).then((response) =>{
                if(response.data.status === 'success'){
                    if(typeof(Cookies.get('servers') === 'undefined')){
                        Cookies.set('servers',JSON.stringify({'servers':[{'ip':serverIP.value, 'name':serverName.value}]}))
                    }else{
                        const serversJSON = JSON.parse(Cookies.get('servers'))
                        serversJSON.servers.push({'ip':serverIP.value, 'name':serverName.value})
                        Cookies.set('servers',JSON.stringify(serversJSON))
                    }
                    ElMessageBox.alert('Create server successfully', 'Tip', {
                        confirmButtonText: 'OK',
                    })
                }
            }).catch((error) =>{
                console.log((error))
            })
        }
        return {
            serverIP,
            serverName,
            checkConnection,
            createServer
        }
    }
}
</script>

<style scoped>
.el-row{
    font-size: 18px;
    margin-top: 50px;
}
.el-row:first-child{
    margin-top: 150px;
}
.el-input{
    font-size: 18px;
}
.el-col{
    text-align: center;
}
</style>