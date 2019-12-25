<template>
    <div class="table-ctn">
        <el-tabs type="border-card" @tab-click="ehandleClick">
             <el-tab-pane  v-for="item in titles" :key="item.id">
                <span slot="label"> 
                    {{item.label}}
                    <!-- <el-badge :value="item.value" class="item" v-if="item.value > 0">
                    </el-badge> -->
                </span>
                <ShopList  @onChangeStatue = 'onChangeStatue' :lists = 'lists'></ShopList>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ShopList from './HomeShopList'
export default {
    components:{
        ShopList
    },
    props:{
        lists:{
            type: Array,
            required: true,
            default: () => {
                return []
            }
        },
        titles:{
            type: Array,
            default: () => {
                return [
                ]
            }
        }
    },
    data(){
        return{
           tabPosition:''
        }
    },
    methods:{
      ehandleClick(tab, event) {
        this.$store.state.selectIndex = tab.index
        this.$store.dispatch('getShopLists',tab.index)
      },
      onChangeStatue(e){
        this.$emit('onChangeStatue')
      },
      
    },
    created(){
        
    }
}
</script>
<style>
.table-ctn .el-badge__content.is-fixed {
    top: 4px;
    right: 3px;
}

</style>

