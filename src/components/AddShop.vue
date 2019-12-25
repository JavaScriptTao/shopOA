<template>
    <div class="add-table-ctn">
        <el-tabs type="border-card" v-model="activeName" :before-leave="beforeLeave">
             <el-tab-pane  v-for="(item, index) in titles" :key="index" >
                <span slot="label" @click = 'tabClick(index)'> 
                    {{item.label}}
                </span>
               <AddShopMsg @changeTab = 'tabClick' :form = 'form' v-if="activeName == '0'"></AddShopMsg>
               <MtMessage @changeTab = 'tabClick' v-if="activeName == '1'"></MtMessage>
               <GuiGeShuXing @changeTab = 'tabClick' v-if="activeName == '2'"></GuiGeShuXing>
               <AddShopMessage @changeTab = 'tabClick' v-if="activeName == '3'"></AddShopMessage>
               <AddShopTuWenMessage @changeTab = 'tabClick' v-if="activeName == '4'"></AddShopTuWenMessage>
              
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import AddShopMsg from './AddShopMsg'
import MtMessage from './MtMessage'
import GuiGeShuXing from './GuiGeShuXing'
import AddShopMessage from './AddShopMessage'
import AddShopTuWenMessage from './AddShopTuWenMessage'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
    components:{
        AddShopMsg, MtMessage, GuiGeShuXing, AddShopMessage, AddShopTuWenMessage
    },
    props:{
        titles:{
            type: Array,
            default: () => {
                return [
                    {id:0, label:'基础信息',value:10 },
                    {id:1, label:'媒体信息'  ,value:0},
                    {id:2, label:'规格属性'  ,value:1},
                    {id:3, label:'商品参数'  ,value:2},
                    {id:4, label:'商品内容'  ,value:0},
                ]
            }
        }
    },
    data(){
        return{
            activeName: '0',
            form:{
                presale: 0,
                is_open_intergal: 0,
                exemption: 0,
                open_full_reduction: 0,
                limit_type: 1,
                commission_type: 1,
                spreader_commission_type: 0,
            }
        }
    },
    methods:{
     tabClick(e){
         this.activeName = ``+ e;
       
         console.log(e);
         
     },
     beforeLeave(e){
         
         
     },
      ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag'
        ])
    },
    created(){
        this.getCategoryList()
        this.form = this.$store.state.addShopForm1;
    }
}
</script>
<style>
.table-ctn .el-badge__content.is-fixed {
    top: 4px;
    right: 3px;
}
.add-table-ctn {
    margin-top: 10px;
}
</style>

