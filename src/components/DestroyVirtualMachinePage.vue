<template>
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
                        <el-button type="danger">Destroy the Virtual Machine</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="1"></el-col>
    </el-row>
</template>

<script>
import { ref } from "vue";

export default {
    name: "DestroyVirtualMachinePage",
    setup(props,context){
        const virtualMachineName = ref('')

        return {
            virtualMachineName
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