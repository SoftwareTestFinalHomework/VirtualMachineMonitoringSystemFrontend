<template>
    <el-row>
        <el-col :span="4">
            <FunctionSelector></FunctionSelector>
        </el-col>
        <el-col :span="20">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
import FunctionSelector from "./FunctionSelector.vue";
export default {
    name: "HomePage",
    components: {
        FunctionSelector
    },
    setup(props,context){

    }
}
</script>

<style scoped>

</style>