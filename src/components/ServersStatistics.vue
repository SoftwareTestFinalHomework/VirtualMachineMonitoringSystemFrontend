<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Overview">
            <div>
                <el-row class="selector">
                    <el-select placeholder="Select Server" size="large">
                        <el-option
                            v-for="item in serverList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-row>
                <el-row class="row-height">
                    <el-col :span="12">
                        <el-card class="overview-card"></el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="overview-card"></el-card>
                    </el-col>
                </el-row>
                <el-row class="row-height">
                    <el-col :span="12">
                        <el-card class="overview-card"></el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="overview-card"></el-card>
                    </el-col>
                </el-row>
            </div>
        </el-tab-pane>
        <el-tab-pane label="CPU Usage">
            <div>
                <el-card class="single-card">

                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="NetWork Usage">
            <div>
                <el-card class="single-card">

                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Memory Usage">
            <div>
                <el-card class="single-card">

                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Disk Usage">
            <div>
                <el-card class="single-card">

                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import {ref} from "vue";

export default {
    name: "ServersStatistics",
    setup(props,context){
        const serverList = ref([])
        return {
            serverList
        }
    }
}
</script>

<style scoped>
div{
    height: 760px;
}

.row-height{
    margin-top: 30px;
    height: 300px;
}
.overview-card{
    height: 300px;
    margin-left: 30px;
}
.selector{
    height: 20px;
    margin-left: 33px;
}
.single-card{
    height: 600px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
}
</style>