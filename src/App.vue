<template>
    <NavBar></NavBar>
    <router-view></router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
    components:{
        NavBar
    },
    setup(props,context){

    }
}
</script>

<style>

</style>
