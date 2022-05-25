<template>
    <el-menu
        default-active="1"
        @select="handleSelect"
    >
        <el-menu-item index="1">
            <span>Add Server</span>
        </el-menu-item>
        <el-menu-item index="2">
            <span>Delete Server</span>
        </el-menu-item>
        <el-menu-item index="3">
            <span>Add Virtual Machine</span>
        </el-menu-item>
        <el-menu-item index="4">
            <span>Delete Virtual Machine</span>
        </el-menu-item>
<!--        <el-menu-item index="5">-->
<!--            <span>Servers Statistics</span>-->
<!--        </el-menu-item>-->
        <el-menu-item index="5">
            <span>Virtual Machines Statistics</span>
        </el-menu-item>
        <el-menu-item index="6">
            <span>Display List</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { useRouter } from "vue-router";

export default {
    name: "FunctionSelector",
    setup(props,context){
        const router = useRouter()

        const handleSelect = (index) =>{
            if(index === '1'){
                router.push('/createServer')
            }else if(index === '2'){
                router.push('/destroyServer')
            }else if(index === '3'){
                router.push('/createVirtualMachine')
            }else if(index === '4'){
                router.push('/destroyVirtualMachine')
            }else if(index === '5'){
                // router.push('/serverStatistic')
                router.push('/virtualMachineStatistic')
            }else if(index === '6'){
                router.push('/displayList')
            }
        }
        return {
            handleSelect
        }
    }
}
</script>

<style scoped>
span{
    font-size: 18px;
}
</style>