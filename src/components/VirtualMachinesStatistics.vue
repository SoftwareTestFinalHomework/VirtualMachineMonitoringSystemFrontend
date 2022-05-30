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
                            <div id="memory_usage_5s"></div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="row-height">
                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div id="disk_usage_5s"></div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="overview-card">
                            <div id="network_5s"></div>
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
import { ref, onMounted, onUnmounted } from "vue"
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    DataZoomComponent,
    LegendComponent
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
    DataZoomComponent,
    LegendComponent
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
        let Timer = null
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
            clearInterval(Timer)
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
                            option && cpuChart.setOption(option, true)
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
                            option && memoryChart.setOption(option, true)
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
                            option && diskChart.setOption(option, true)
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
                            option && networkChart.setOption(option, true)
                        }
                        drawCpuUsageIntervalThirtyMinutes()
                        drawMemoryUsageIntervalThirtyMinutes()
                        drawDiskUsageIntervalThirtyMinutes()
                        drawNetworkUsageIntervalThirtyMinutes()
                    }).catch((error) =>{
                        console.log(error)
                    })

                    axios({
                        method: 'get',
                        url: 'http://'+serverList.value[i].ip+':8000/getSelectedVirtualMachineData?interval=5s&name='+selectedVirtualMachine.value
                    }).then((response) =>{
                        console.log(response.data.data)
                        const cpuUsageDynamicData = response.data.data.map((item) =>{
                            return item.cpu_usage
                        })
                        const cpuUsageCategories = response.data.data.map((item) =>{
                            return item.time.split('.')[0]
                        })
                        const cpuUsageDynamicOption = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: cpuUsageCategories
                            },
                            yAxis: {
                                name: 'CPU Usage(%)',
                                type: 'value'
                            },
                            series: [
                                {
                                    name: 'CPU Usage',
                                    type: 'line',
                                    showSymbol: false,
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

                        const memoryUsageDynamicData = response.data.data.map((item) =>{
                            return item.memory_usage
                        })
                        const memoryUsageCategories = response.data.data.map((item) =>{
                            return item.time.split('.')[0]
                        })
                        const memoryUsageDynamicOption = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: memoryUsageCategories
                            },
                            yAxis: {
                                name: 'Memory Usage(%)',
                                type: 'value'
                            },
                            series: [
                                {
                                    name: 'Memory Usage',
                                    type: 'line',
                                    showSymbol: false,
                                    itemStyle: {
                                        color: 'rgb(8,90,243)'
                                    },
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgb(17,161,238)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgb(116,13,227)'
                                            }
                                        ])
                                    },
                                    data: memoryUsageDynamicData
                                }
                            ]
                        }
                        const memoryUsageDom5s = document.getElementById('memory_usage_5s')
                        const memoryUsageChart5s = echarts.init(memoryUsageDom5s)

                        const diskUsageDynamicData = response.data.data.map((item) =>{
                            return item.disk_usage * 100
                        })
                        const diskUsageCategories = response.data.data.map((item) =>{
                            return item.time.split('.')[0]
                        })
                        const diskUsageDynamicOption = {
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: diskUsageCategories
                            },
                            yAxis: {
                                name: 'Disk Usage(%)',
                                type: 'value'
                            },
                            series: [
                                {
                                    name: 'Disk Usage',
                                    type: 'line',
                                    showSymbol: false,
                                    itemStyle: {
                                        color: 'rgb(8,188,243)'
                                    },
                                    areaStyle: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: 'rgb(17,238,231)'
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgb(13,227,170)'
                                            }
                                        ])
                                    },
                                    data: diskUsageDynamicData
                                }
                            ]
                        }
                        const diskUsageDom5s = document.getElementById('disk_usage_5s')
                        const diskUsageChart5s = echarts.init(diskUsageDom5s)

                        const netInDynamicData = response.data.data.map((item) =>{
                            return item.network_in_usage
                        })
                        const netOutDynamicData = response.data.data.map((item) =>{
                            return item.network_out_usage
                        })
                        const networkCategories = response.data.data.map((item) =>{
                            return item.time.split('.')[0]
                        })
                        const networkDynamicOption = {
                            legend:{
                                data: ['NET IN(KB)', 'NET OUT(KB)']
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: networkCategories
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    name: 'NET IN(KB)',
                                    type: 'line',
                                    showSymbol: false,
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
                                    data: netInDynamicData
                                },
                                {
                                    name: 'NET OUT(KB)',
                                    type: 'line',
                                    showSymbol: false,
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
                                    data: netOutDynamicData
                                }
                            ]
                        }
                        const networkDom5s = document.getElementById('network_5s')
                        const networkChart5s = echarts.init(networkDom5s)
                        Timer = setInterval(() =>{
                            axios({
                                method: 'get',
                                url: 'http://'+serverList.value[i].ip+':8000/getRunningVirtualMachinesCpuUsage?name='+selectedVirtualMachine.value
                            }).then((response) =>{
                                if(cpuUsageDynamicData.length <50){
                                    cpuUsageDynamicData.push(response.data.cpu_usage)
                                    cpuUsageCategories.push(new Date().toString())
                                }else {
                                    cpuUsageDynamicData.shift()
                                    cpuUsageCategories.shift()
                                    cpuUsageDynamicData.push(response.data.cpu_usage)
                                    cpuUsageCategories.push(new Date().toString())
                                }
                                cpuUsageChart5s.setOption({
                                    xAxis: [
                                        {
                                            data: cpuUsageCategories
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

                            axios({
                                method: 'get',
                                url: 'http://'+serverList.value[i].ip+':8000/getRunningVirtualMachinesMemoryUsage?name='+selectedVirtualMachine.value
                            }).then((response) =>{
                                if(memoryUsageDynamicData.length < 50){
                                    memoryUsageDynamicData.push(response.data.memory_usage)
                                    memoryUsageCategories.push(new Date().toString())
                                }else{
                                    memoryUsageDynamicData.shift()
                                    memoryUsageCategories.shift()
                                    memoryUsageDynamicData.push(response.data.memory_usage)
                                    memoryUsageCategories.push(new Date().toString())
                                }
                                memoryUsageChart5s.setOption({
                                    xAxis: [
                                        {
                                            data: memoryUsageCategories
                                        }
                                    ],
                                    series: [
                                        {
                                            data: memoryUsageDynamicData
                                        }
                                    ]
                                })
                            }).catch((error) =>{
                                console.log(error)
                            })

                            axios({
                                method: 'get',
                                url: 'http://'+serverList.value[i].ip+':8000/getRunningVirtualMachinesDiskUsage?name='+selectedVirtualMachine.value
                            }).then((response) =>{
                                if(diskUsageDynamicData.length < 50){
                                    diskUsageDynamicData.push(response.data.disk_usage * 100)
                                    diskUsageCategories.push(new Date().toString())
                                }else {
                                    diskUsageDynamicData.shift()
                                    diskUsageCategories.shift()
                                    diskUsageDynamicData.push(response.data.disk_usage * 100)
                                    diskUsageCategories.push(new Date().toString())
                                }
                                diskUsageChart5s.setOption({
                                    xAxis: [
                                        {
                                            data: diskUsageCategories
                                        }
                                    ],
                                    series: [
                                        {
                                            data: diskUsageDynamicData
                                        }
                                    ]
                                })
                            }).catch((error) =>{
                                console.log(error)
                            })

                            axios({
                                method: 'get',
                                url: 'http://'+serverList.value[i].ip+':8000/getRunningVirtualMachinesNetworkUsage?name='+selectedVirtualMachine.value
                            }).then((response) =>{
                                console.log(response.data.net_in)
                                console.log(response.data.net_out)
                                if(netInDynamicData.length < 50){
                                    netInDynamicData.push(response.data.net_in)
                                    netOutDynamicData.push(response.data.net_out)
                                    networkCategories.push(new Date().toString())
                                }else {
                                    netInDynamicData.shift()
                                    netOutDynamicData.shift()
                                    networkCategories.shift()
                                    netInDynamicData.push(response.data.net_in)
                                    netOutDynamicData.push(response.data.net_out)
                                    networkCategories.push(new Date().toString())
                                }
                                networkChart5s.setOption({
                                    xAxis: [
                                        {
                                            data: networkCategories
                                        }
                                    ],
                                    series: [
                                        {
                                            data: netInDynamicData
                                        },
                                        {
                                            data: netOutDynamicData
                                        }
                                    ]
                                })
                            }).catch((error) =>{
                                console.log(error)
                            })

                        },5000)

                        cpuUsageDynamicOption && cpuUsageChart5s.setOption(cpuUsageDynamicOption, true)
                        memoryUsageDynamicOption && memoryUsageChart5s.setOption(memoryUsageDynamicOption, true)
                        diskUsageDynamicOption && diskUsageChart5s.setOption(diskUsageDynamicOption, true)
                        networkDynamicOption && networkChart5s.setOption(networkDynamicOption,true)
                    }).catch((error) =>{
                        console.log(error)
                    })
                    break
                }
            }

        }
        onMounted(() =>{
            if(typeof(Cookies.get('servers')) !== 'undefined'){
                serverList.value = JSON.parse(Cookies.get('servers')).servers
            }

        })
        onUnmounted(() =>{
            clearInterval(Timer)
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
#memory_usage_5s{
    width: 550px;
    height: 250px;
}
#disk_usage_5s{
    width: 550px;
    height: 250px;
}
#network_5s{
    width: 550px;
    height: 250px;
}
</style>