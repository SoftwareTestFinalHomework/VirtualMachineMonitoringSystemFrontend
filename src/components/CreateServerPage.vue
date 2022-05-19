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
            <el-button type="primary">
                Check Connection
            </el-button>
            <el-button type="primary">
                Create Server
            </el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "CreateServerPage",
    setup(props,context){
        const serverIP = ref('')
        const serverName = ref('')

        return {
            serverIP,
            serverName
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