<template>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="22">
            <el-select placeholder="Select Server" size="large">
                <el-option
                    v-for="item in serverList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
                        <span>Number of CPUs:</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input-number v-model="cpuNum" :min="1" @change="handleChangeCPU"/>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="4">
                        <span>Size of Memory(GB):</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input-number v-model="memorySize" :min="1" @change="handleChangeMemory"/>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="4">
                        <span>Size of Disk(GB):</span>
                    </el-col>
                    <el-col :span="8">
                        <el-input-number v-model="diskSize" :min="10" @change="handleChangeDisk"/>
                    </el-col>
                    <el-col :span="6"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6"></el-col>
                    <el-col :span="4">
                        <span>Operate System:</span>
                    </el-col>
                    <el-col :span="8">
                        <el-select class="selector" placeholder="Choose OS Type">
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
                    <el-col :span="6"></el-col>
                    <el-col :span="12" class="create-button">
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
import { ref } from "vue";

export default {
    name: "CreateVirtualMachinePage",
    setup(props,context){
        const serverList = ref('')
        const cpuNum = ref('')
        const memorySize = ref('')
        const diskSize = ref('')
        const osTypes = ref(['Ubuntu22.04','Ubuntu20.04','Ubuntu18.04'])
        const virtualMachineName = ref('')

        const handleChangeCPU = (currentValue, oldValue) =>{

        }
        const handleChangeMemory = (currentValue, oldValue) =>{

        }
        const handleChangeDisk = (currentValue, oldValue) =>{

        }
        return {
            serverList,
            cpuNum,
            memorySize,
            diskSize,
            osTypes,
            virtualMachineName,
            handleChangeCPU,
            handleChangeMemory,
            handleChangeDisk
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