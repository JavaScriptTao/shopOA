<template>
    <Home :defaultActive = 'defaultActive' @search = 'onSearch' :form = 'form' type = 'home'></Home>
</template>

<script>
import Home from '@/components/Home'
import api from '../utils/api'

export default {
    components:{ Home },
    data(){
        return {
            form:{},
            loading: true,
            defaultActive: '1-2'
        }
    },
    methods:{
        onSearch(e){
            console.log(e);
            
        }
    },
    created(){

    }
}
</script>

<style>

</style>
