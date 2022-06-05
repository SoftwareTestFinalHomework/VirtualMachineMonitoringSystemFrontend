<template>
    <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-card>
                <el-tree :data="serverAndVirtualMachineData"
                         @node-click="handleNodeClick"
                         default-expand-all/>
            </el-card>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>

</template>

<script>
import { onMounted, ref } from 'vue'
import axios from "axios"
import Cookies from 'js-cookie'
export default {
    name: "DisplayList",
    setup(props,context){
        const serverAndVirtualMachineData = ref([])
        const handleNodeClick = () =>{}
        onMounted(() =>{
            console.log("hahaha",serverAndVirtualMachineData.value)
            if(typeof(Cookies.get('servers')) !== 'undefined'){
                // console.log(Cookies.get('servers'))
                const serversJSON = JSON.parse(Cookies.get('servers'))
                for(let i=0;i<serversJSON.servers.length;i++){
                    serverAndVirtualMachineData.value.push({
                        label: serversJSON.servers[i].name + '('+ serversJSON.servers[i].ip +')',
                        children: []
                    })
                    axios({
                        method: 'get',
                        url: 'http://'+serversJSON.servers[i].ip +':8000/getAllRunningVirtualMachinesName'
                    }).then((response) =>{
                        console.log(response.data.allRunningVirtualMachines);
                        for(let j=0;j<response.data.allRunningVirtualMachines.length;j++){
                            serverAndVirtualMachineData.value[i].children.push({
                                label: response.data.allRunningVirtualMachines[j] + '(Virtual Machine)'
                            })
                        }
                    }).catch((error) =>{
                        console.log(error)
                    })
                }
            }

        })
        return {
            serverAndVirtualMachineData,
            handleNodeClick,
        }
    }
}
</script>

<style scoped>
.el-tree{
    margin-top: 20px;
}
.el-card{
    margin-top: 80px;
}

</style>