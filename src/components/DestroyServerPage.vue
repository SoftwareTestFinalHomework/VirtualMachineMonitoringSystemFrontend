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
            <el-button type="danger" @click="deleteServer">
                Delete the Server
            </el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script>
import { ref } from "vue"
import axios from "axios"
import { ElMessageBox } from "element-plus"
import Cookies from "js-cookie"
export default {
    name: "DestroyServerPage",
    setup(props,context){
        const serverIP = ref('')
        const deleteServer = () =>{
            axios({
                method: 'get',
                url: 'http://'+ serverIP.value +':8000/deleteServer?ip=' + serverIP.value
            }).then((response) =>{
                if(response.data.status === 'success'){
                    const serversJSON = JSON.parse(Cookies.get('servers'))
                    for(let i=0;i<serversJSON.servers.length;i++){
                        if(serversJSON.servers[i].ip === serverIP.value){
                            serversJSON.servers.splice(i,1)
                            break
                        }
                    }
                    Cookies.set('servers',JSON.stringify(serversJSON),{ expires: 365 })
                    ElMessageBox.alert('Delete server successfully', 'Tip', {
                        confirmButtonText: 'OK',
                    })
                }
            })
        }
        return {
            serverIP,
            deleteServer
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