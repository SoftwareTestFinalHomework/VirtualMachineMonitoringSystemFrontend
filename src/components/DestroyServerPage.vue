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
            <el-button type="danger">
                Delete the Server
            </el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script>
import { ref } from "vue";

export default {
    name: "DestroyServerPage",
    setup(props,context){
        const serverIP = ref('')

        return {
            serverIP
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