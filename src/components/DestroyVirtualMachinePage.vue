<template>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="22">
            <el-select v-model="selectedServer" placeholder="Select Server" size="large">
                <el-option
                    v-for="item in serverList"
                    :key="item.name"
                    :value="item.name"
                />
            </el-select>
        </el-col>
        <el-col :span="1"></el-col>
    </el-row>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="22">
            <el-card>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="4">
                        <span>Machine Name:</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="virtualMachineName" class="input-machine-name" placeholder="Please input Virtual Machine Name" clearable></el-input>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col class="destroy-button">
                        <el-button type="danger" @click="clickToDeleteVirtualMachine">Destroy the Virtual Machine</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="1"></el-col>
    </el-row>
</template>

<script>
import { ref, onMounted } from "vue"
import Cookies from "js-cookie"
import axios from "axios"
import { ElMessageBox } from "element-plus"
export default {
    name: "DestroyVirtualMachinePage",
    setup(props,context){
        const virtualMachineName = ref('')
        const serverList = ref([])
        const selectedServer = ref('')
        const clickToDeleteVirtualMachine = () =>{
            if(selectedServer.value === ''){
                ElMessageBox.alert('You need to select a server!', 'Warning', {
                    confirmButtonText: 'OK',
                })
                return
            }
            if(virtualMachineName.value === ''){
                ElMessageBox.alert('You need to input virtual machine name!', 'Warning', {
                    confirmButtonText: 'OK',
                })
                return
            }
            let pos = -1
            for(let i=0;i<serverList.value.length;i++){
                if(serverList.value[i].name === selectedServer.value){
                    pos = i
                    break
                }
            }
            axios({
                method: 'post',
                url: 'http://'+serverList.value[pos].ip+':8000/deleteVirtualMachine',
                data: {
                    virtualMachineName: virtualMachineName.value
                }
            }).then((response) =>{
                console.log(response)
                ElMessageBox.alert('Delete virtual machine successfully', 'Tip', {
                    confirmButtonText: 'OK',
                })
            }).catch((error) =>{
                console.log(error)
            })
        }
        onMounted(() =>{
            if(typeof(Cookies.get('servers')) !== 'undefined'){
                serverList.value = JSON.parse(Cookies.get('servers')).servers
            }
        })

        return {
            virtualMachineName,
            serverList,
            selectedServer,
            clickToDeleteVirtualMachine
        }
    }
}
</script>

<style scoped>
.el-row{
    margin-top: 20px;
}
.destroy-button{
    text-align: center;
}
</style>