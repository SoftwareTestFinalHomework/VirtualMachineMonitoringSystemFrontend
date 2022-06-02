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
                    <el-col :span="5"></el-col>
                    <el-col :span="5">
                        <span>Number of CPUs:</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input-number v-model="cpuNum" :min="1" @change="handleChangeCPU"/>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="5"></el-col>
                    <el-col :span="5">
                        <span>Size of Memory(GB):</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input-number v-model="memorySize" :min="1" @change="handleChangeMemory"/>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="5"></el-col>
                    <el-col :span="5">
                        <span>Size of Disk(GB):</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input-number v-model="diskSize" :min="10" @change="handleChangeDisk"/>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="5"></el-col>
                    <el-col :span="5">
                        <span>Operate System:</span>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="osTypeSelected" class="selector" placeholder="Choose OS Type">
                            <el-option
                                v-for="item in osTypes"
                                :key="item"
                                :value="item"
                            />
                        </el-select>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="5"></el-col>
                    <el-col :span="5">
                        <span>Machine Name:</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="virtualMachineName" class="input-machine-name" placeholder="Please input Virtual Machine Name" clearable></el-input>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="12" class="create-button" @click="clickToCreateVirtualMachine">
                        <el-button type="primary">
                            Create Virtual Machine
                        </el-button>
                    </el-col>
                    <el-col :span="6"></el-col>
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
    name: "CreateVirtualMachinePage",
    setup(props,context){
        const serverList = ref([])
        const cpuNum = ref(1)
        const memorySize = ref(1)
        const diskSize = ref(10)
        const osTypes = ref(['Ubuntu22.04','Ubuntu20.04','Ubuntu18.04'])
        const osTypeSelected = ref('')
        const virtualMachineName = ref('')
        const selectedServer = ref('')
        const clickToCreateVirtualMachine = () =>{
            if(selectedServer.value === ''){
                ElMessageBox.alert('You need to select a server!', 'Warning', {
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
                url: 'http://'+serverList.value[pos].ip+':8000/createNewVirtualMachine',
                data: {
                    cpuNum: cpuNum.value,
                    memorySize: memorySize.value,
                    diskSize: diskSize.value,
                    osTypeSelected: osTypeSelected.value,
                    virtualMachineName: virtualMachineName.value
                }
            }).then((response) =>{
                console.log(response)
                ElMessageBox.alert('Create virtual machine successfully! You may need to wait for minutes', 'Tip', {
                    confirmButtonText: 'OK',
                })
            }).catch((error) =>{
                console.log(error)
            })
        }

        const handleChangeCPU = (currentValue, oldValue) =>{
            cpuNum.value = currentValue
        }
        const handleChangeMemory = (currentValue, oldValue) =>{
            memorySize.value = currentValue
        }
        const handleChangeDisk = (currentValue, oldValue) =>{
            diskSize.value = currentValue
        }

        onMounted(() =>{
            if(typeof(Cookies.get('servers')) !== 'undefined'){
                serverList.value = JSON.parse(Cookies.get('servers')).servers
            }
        })

        return {
            serverList,
            cpuNum,
            memorySize,
            diskSize,
            osTypes,
            virtualMachineName,
            selectedServer,
            osTypeSelected,
            handleChangeCPU,
            handleChangeMemory,
            handleChangeDisk,
            clickToCreateVirtualMachine
        }
    }
}
</script>

<style scoped>
.el-row{
    margin-top: 20px;
}
.el-row:last-child{
    margin-top: 40px;
}
.configure-row{

}
.el-input-number{
    margin-left: 50px;
}
span{
    margin-left: 50px;
}
.selector{
    margin-left: 50px;
}
.create-button{
    text-align: center;
}
.input-machine-name{
    margin-left: 50px;
}
</style>