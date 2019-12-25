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
            defaultActive: '1-1'
        }
    },
    methods:{
        onSearch(){
            console.log(this.form);
            
        }
    },
    created(){

    }
}
</script>

<style>

</style>
