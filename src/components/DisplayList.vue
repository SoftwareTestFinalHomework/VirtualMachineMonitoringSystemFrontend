<template>
    <el-tree :data="data" @node-click="handleNodeClick" />
</template>

<script>
import { ref, reactive} from 'vue'
export default {
    name: "DisplayList",
    setup(props,context){
        const serverAndVirtualMachineData = reactive({})
        const handleNodeClick = () =>{

        }

        return {
            serverAndVirtualMachineData,
            handleNodeClick
        }
    }
}
</script>

<style scoped>

</style>