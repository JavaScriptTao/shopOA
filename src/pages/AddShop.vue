<template>
    <Home @search = 'onSearch' :form = 'form' type = 'addShop'></Home>
</template>

<script>
import Home from '@/components/Home'
export default {
    components:{ Home },
    data(){
        return {
            form:{}
        }
    },
    methods:{
        onSearch(){
            console.log(this.form);
            
        }
    }
}
</script>

<style>

</style>
