<template>
    <el-menu
        default-active="1"
        @select="handleSelect"
    >
        <el-menu-item index="1">
            <span>Create Server</span>
        </el-menu-item>
        <el-menu-item index="2">
            <span>Destroy Server</span>
        </el-menu-item>
        <el-menu-item index="3">
            <span>Create Virtual Machine</span>
        </el-menu-item>
        <el-menu-item index="4">
            <span>Destroy Virtual Machine</span>
        </el-menu-item>
        <el-menu-item index="5">
            <span>Servers Statistics</span>
        </el-menu-item>
        <el-menu-item index="6">
            <span>Virtual Machines Statistics</span>
        </el-menu-item>
        <el-menu-item index="7">
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
                router.push('/serverStatistic')
            }else if(index === '6'){
                router.push('/virtualMachineStatistic')
            }else if(index === '7'){
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