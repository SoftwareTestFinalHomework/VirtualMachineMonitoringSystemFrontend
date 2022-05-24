<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Overview">
            <div>
                <el-row class="selector">
                    <el-select v-model="selectedServer"
                               placeholder="Select Server"
                               size="large"
                               @change="getVirtualMachineOfServer">
                        <el-option
                            v-for="item in serverList"
                            :key="item.name"
                            :value="item.name"
                        />
                    </el-select>
                    <el-select v-model="selectedVirtualMachine"
                               class="no-two-selector"
                               placeholder="Select Virtual Machine"
                               size="large"
                               @change="getVirtualMachineData">
                        <el-option
                            v-for="item in virtualMachineList"
                            :key="item"
                            :value="item"
                        />
                    </el-select>
                </el-row>
                <el-row class="row-height">
                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div id="cpu_usage_5s"></div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="overview-card">
<!--                            <div>-->
<!--                                这里写echarts-->
<!--                            </div>-->
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="row-height">
                    <el-col :span="12">
                        <el-card class="overview-card">
<!--                            <div>-->
<!--                                这里写echarts-->
<!--                            </div>-->
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="overview-card">
<!--                            <div>-->
<!--                                这里写echarts-->
<!--                            </div>-->
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-tab-pane>
        <el-tab-pane label="CPU Usage">
            <div>
                <el-card class="single-card">
                    <div id="cpu_usage_30m"></div>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="NetWork Usage">
            <div>
                <el-card class="single-card">
                    <div id="network_usage_30m"></div>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Memory Usage">
            <div>
                <el-card class="single-card">
                    <div id="memory_usage_30m"></div>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Disk Usage">
            <div>
                <el-card class="single-card">
                    <div id="disk_usage_30m"></div>
                </el-card>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { ref, onMounted } from "vue"
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import Cookies from "js-cookie"
import axios from "axios"
echarts.use([
    GridComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    DataZoomComponent
])
export default {
    name: "VirtualMachinesStatistics",
    setup(props,context){
        const serverList = ref([])
        const selectedServer = ref('')
        const virtualMachineList = ref([])
        const selectedVirtualMachine = ref('')
        const realTimeCpuUsage = ref('')
        const realTimeMemoryUsage = ref('')
        const realTimeDiskUsage = ref('')
        const realTimeNetworkUsage = ref('')
        const getVirtualMachineOfServer = (val) =>{
            for(let i=0;i<serverList.value.length;i++){
                if(serverList.value[i].name === selectedServer.value){
                    axios({
                        method: 'get',
                        url: 'http://'+serverList.value[i].ip +':8000/getAllRunningVirtualMachinesName'
                    }).then((response) =>{
                        virtualMachineList.value = response.data.allRunningVirtualMachines
                    }).catch((error) =>{
                        console.log(error)
                    })
                    break
                }
            }
        }
        const getVirtualMachineData = (val) =>{
            for(let i=0;i<serverList.value.length;i++){
                if(serverList.value[i].name === selectedServer.value){
                    axios({
                        method: 'get',
                        url: 'http://'+serverList.value[i].ip+':8000/getSelectedVirtualMachineData?interval=30m&name='+selectedVirtualMachine.value
                    }).then((response) =>{
                        const drawCpuUsageIntervalThirtyMinutes = () =>{
                            const option = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: []
                                },
                                yAxis: {
                                    name: 'CPU Usage(%)',
                                    type: 'value'
                                },
                                title: {
                                    left: 'center',
                                    text: selectedVirtualMachine.value + ' CPU Usage(30 minute interval)'
                                },
                                toolbox: {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none'
                                        },
                                        restore: {},
                                        saveAsImage: {}
                                    }
                                },
                                dataZoom: [
                                    {
                                        type: 'inside',
                                        start: 0,
                                        end: 100
                                    },
                                    {
                                        start: 0,
                                        end: 10
                                    }
                                ],
                                series: [
                                    {
                                        name: 'CPU Usage',
                                        type: 'line',
                                        itemStyle: {
                                            color: 'rgb(229,22,22)'
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: 'rgb(255, 158, 68)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgb(255, 70, 131)'
                                                }
                                            ])
                                        },
                                        data: []
                                    }
                                ]
                            }
                            option.xAxis.data = response.data.data.map((item) =>{
                                return item.time
                            })
                            option.series[0].data = response.data.data.map((item) =>{
                                return item.mean
                            })
                            const cpuChartDom = document.getElementById('cpu_usage_30m')
                            const cpuChart = echarts.init(cpuChartDom)
                            option && cpuChart.setOption(option)
                        }
                        const drawMemoryUsageIntervalThirtyMinutes = () =>{
                            const option = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: []
                                },
                                yAxis: {
                                    name: 'Memory Usage(%)',
                                    type: 'value'
                                },
                                title: {
                                    left: 'center',
                                    text: selectedVirtualMachine.value + ' Memory Usage(30 minute interval)'
                                },
                                toolbox: {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none'
                                        },
                                        restore: {},
                                        saveAsImage: {}
                                    }
                                },
                                dataZoom: [
                                    {
                                        type: 'inside',
                                        start: 0,
                                        end: 100
                                    },
                                    {
                                        start: 0,
                                        end: 10
                                    }
                                ],
                                series: [
                                    {
                                        name: 'Memory Data',
                                        type: 'line',
                                        itemStyle: {
                                            color: 'rgb(22,205,238)'
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: 'rgb(17,139,238)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgb(109,13,227)'
                                                }
                                            ])
                                        },
                                        data: []
                                    }
                                ]
                            }
                            option.xAxis.data = response.data.data.map((item) =>{
                                return item.time
                            })
                            option.series[0].data = response.data.data.map((item) =>{
                                return item.mean_1
                            })
                            const memoryChartDom = document.getElementById('memory_usage_30m')
                            const memoryChart = echarts.init(memoryChartDom)
                            option && memoryChart.setOption(option)
                        }
                        const drawDiskUsageIntervalThirtyMinutes = () =>{
                            const option = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: []
                                },
                                yAxis: {
                                    name: 'Disk Usage(%)',
                                    type: 'value'
                                },
                                title: {
                                    left: 'center',
                                    text: selectedVirtualMachine.value + ' Disk Usage(30 minute interval)'
                                },
                                toolbox: {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none'
                                        },
                                        restore: {},
                                        saveAsImage: {}
                                    }
                                },
                                dataZoom: [
                                    {
                                        type: 'inside',
                                        start: 0,
                                        end: 100
                                    },
                                    {
                                        start: 0,
                                        end: 10
                                    }
                                ],
                                series: [
                                    {
                                        name: 'Disk Data',
                                        type: 'line',
                                        itemStyle: {
                                            color: 'rgb(22,205,238)'
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: 'rgb(17,139,238)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgb(109,13,227)'
                                                }
                                            ])
                                        },
                                        data: []
                                    }
                                ]
                            }
                            option.xAxis.data = response.data.data.map((item) =>{
                                return item.time
                            })
                            option.series[0].data = response.data.data.map((item) =>{
                                return item.mean_2 * 100
                            })
                            const diskChartDom = document.getElementById('disk_usage_30m')
                            const diskChart = echarts.init(diskChartDom)
                            option && diskChart.setOption(option)
                        }
                        const drawNetworkUsageIntervalThirtyMinutes = () =>{
                            const option = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                xAxis: {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: []
                                },
                                yAxis: {
                                    name: 'Network Usage(KB)',
                                    type: 'value'
                                },
                                title: {
                                    left: 'center',
                                    text: selectedVirtualMachine.value + ' Network Usage(30 minute interval)'
                                },
                                toolbox: {
                                    feature: {
                                        dataZoom: {
                                            yAxisIndex: 'none'
                                        },
                                        restore: {},
                                        saveAsImage: {}
                                    }
                                },
                                dataZoom: [
                                    {
                                        type: 'inside',
                                        start: 0,
                                        end: 100
                                    },
                                    {
                                        start: 0,
                                        end: 10
                                    }
                                ],
                                series: [
                                    {
                                        name: 'Network Out Data',
                                        type: 'line',
                                        itemStyle: {
                                            color: 'rgb(22,205,238)'
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: 'rgb(17,139,238)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgb(109,13,227)'
                                                }
                                            ])
                                        },
                                        data: []
                                    },
                                    {
                                        name: 'Network In Data',
                                        type: 'line',
                                        itemStyle: {
                                            color: 'rgb(239,210,12)'
                                        },
                                        areaStyle: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                {
                                                    offset: 0,
                                                    color: 'rgb(238,142,17)'
                                                },
                                                {
                                                    offset: 1,
                                                    color: 'rgb(238,21,61)'
                                                }
                                            ])
                                        },
                                        data: []
                                    }
                                ]
                            }
                            option.xAxis.data = response.data.data.map((item) =>{
                                return item.time
                            })
                            option.series[0].data = response.data.data.map((item) =>{
                                return item.mean_3
                            })
                            option.series[1].data = response.data.data.map((item) =>{
                                return item.mean_4
                            })
                            const networkChartDom = document.getElementById('network_usage_30m')
                            const networkChart = echarts.init(networkChartDom)
                            option && networkChart.setOption(option)
                        }
                        drawCpuUsageIntervalThirtyMinutes()
                        drawMemoryUsageIntervalThirtyMinutes()
                        drawDiskUsageIntervalThirtyMinutes()
                        drawNetworkUsageIntervalThirtyMinutes()
                    }).catch((error) =>{
                        console.log(error)
                    })

                    const cpuUsageDynamicData = []
                    const categories = []
                    const cpuUsageDynamicOption = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: categories
                        },
                        yAxis: {
                            name: 'CPU Usage(%)',
                            type: 'value'
                        },
                        series: [
                            {
                                name: 'CPU Usage',
                                type: 'line',
                                itemStyle: {
                                    color: 'rgb(243,8,28)'
                                },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: 'rgb(238,17,128)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgb(220,13,227)'
                                        }
                                    ])
                                },
                                data: cpuUsageDynamicData
                            }
                        ]
                    }
                    const cpuUsageDom5s = document.getElementById('cpu_usage_5s')
                    const cpuUsageChart5s = echarts.init(cpuUsageDom5s)
                    setInterval(() =>{
                        axios({
                            method: 'get',
                            url: 'http://'+serverList.value[i].ip+':8000/getRunningVirtualMachinesCpuUsage?name='+selectedVirtualMachine.value
                        }).then((response) =>{
                            console.log(response.data.cpu_usage)
                            if(cpuUsageDynamicData.length <50){
                                cpuUsageDynamicData.push(response.data.cpu_usage)
                                categories.push(new Date().toString())
                            }else {
                                cpuUsageDynamicData.shift()
                                categories.shift()
                                cpuUsageDynamicData.push(response.data.cpu_usage)
                                categories.push(new Date().toString())
                            }
                            cpuUsageChart5s.setOption({
                                xAxis: [
                                    {
                                        data: categories
                                    }
                                ],
                                series: [
                                    {
                                        data: cpuUsageDynamicData
                                    }
                                ]
                            })
                        }).catch((error) =>{
                            console.log(error)
                        })
                    },5000)
                    cpuUsageDynamicOption && cpuUsageChart5s.setOption(cpuUsageDynamicOption)
                    break
                }
            }

        }
        onMounted(() =>{
            if(typeof(Cookies.get('servers')) !== 'undefined'){
                serverList.value = JSON.parse(Cookies.get('servers')).servers
            }
        })
        return {
            serverList,
            virtualMachineList,
            selectedServer,
            selectedVirtualMachine,
            realTimeCpuUsage,
            realTimeMemoryUsage,
            realTimeDiskUsage,
            realTimeNetworkUsage,
            getVirtualMachineOfServer,
            getVirtualMachineData
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

.no-two-selector{
    margin-left: 33px;
}
.single-card{
    height: 600px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
}
#cpu_usage_30m{
    margin-top: 20px;
    width: 1150px;
    height: 500px;
}
#memory_usage_30m{
    margin-top: 20px;
    width: 1150px;
    height: 500px;
}
#disk_usage_30m{
    margin-top: 20px;
    width: 1150px;
    height: 500px;
}
#network_usage_30m{
    margin-top: 20px;
    width: 1150px;
    height: 500px;
}
#cpu_usage_5s{
    width: 550px;
    height: 250px;
}
</style>