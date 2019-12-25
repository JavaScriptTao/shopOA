<template>
    <div class="form-ctn" ref="myC">
        <div class="top-tip-box">
            <span>添加商品时，默认商品参数跟随所选分类而变化，请确定商品分类已经选好再来编辑商品参数。</span>
        </div>
        <div  class="top-ts-box" >
            提示：<span v-popover:popover> <i class = 'el-icon-info ts-icon'></i> 添加的参数将展示在小程序商品详情页。</span>
        </div>
        <el-popover
        ref="popover"
        placement="right"
        width="200"
        trigger="hover">
            <div class="hover-img">
                
            </div>
        </el-popover>
        <div class="csList-box">
            <span>参数列表</span>
            <div class="lists-box">
                <div class="list-item-box" v-for="(item, index) in lists" :key="index">
                    <el-input  placeholder="请输入参数"  v-model="item.param"  clearable style="width:200px; height:33px;"></el-input>
                    <el-input  type="textarea" autosize placeholder="请输入参数下的内容"  v-model="item.detail" style="width:200px;"></el-input>
                    <el-button @click="editBtn({ i: index, type: 0, item: item })" size = mini class="btn-icon" type="danger" icon="el-icon-delete"></el-button>
                    <!-- <el-button @click="editBtn({ i: index, type: 1, item: item })" size = mini class="btn-icon" type="primary" icon="el-icon-plus"></el-button> -->
                </div>
                <div class="bottom-addbtn-box">
                    <el-button @click="addNewCs" plain size = mini class="btn-icon" type="primary" icon="el-icon-plus">新增参数</el-button>
                </div>
            </div>
        </div>
       <div class="bottom-wrap">
            <el-button @click="tabClick(0)"  size = 'mini'>取消</el-button>
            <el-button @click="tabClick(1)" size = 'mini' type="primary">上一步</el-button>
            <el-button @click="tabClick(2)" size = 'mini' type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        form:{
            type:Object,
            default:()=>{
                return {
                    isYS:0
                }
            }
        },
        newForm:{
            type: Object,
            default:() => {
                return{

                }
            }
        },
        dialogFormVisible:{
            type:Boolean,
            default:()=>{
                return false
            }
        }
    },
    data(){
        return{
            obj:{},
            lists:[],
            submitLists:[]
        }
        
    },
     methods:{
        addNewCs(){
            let obj = {
        }
            this.lists.push(obj)
        },
        editBtn(e){
            console.log(e);
            if (e.type == 1) { // ad
                if (e.item.ms || e.item.cs) {
                    this.submitLists.splice(e.i, 0, e.item)
                }
            } else { // del
                this.lists.splice(e.i,1)
            }
            
        },
        submit(){
            console.log(this.submitLists);

            
        },
         tabClick(e){
            if (e === 0) {
                this.$router.push('/shopList')
            } 
            else if(e === 1) {
                this.$emit('changeTab',2)
            }
            else if(e === 2) {
                this.$store.state.GoodContent.para = this.lists
                this.$emit('changeTab',4)
            }
        }
     },
    created(){
        this.lists = this.$store.state.GoodContent.para
    }
}
</script>
<style>
.form-ctn {
    flex: 1;
    background-color: #fff;
}
.top-tip-box {
    height: 20px;
    padding: 8px 16px;
    background-color: #fdf6ec;
    color: #e6a23c;
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 13px;
}
.top-ts-box {
    font-size: 14px;
    color: #38f;
    line-height: 56px;
    margin-left: 50px;
}
.hover-img {
    width: 187px;
    height: 333px;
    background-color: salmon;
    margin: 0 auto;
}
.csList-box {
    min-height: 100px;
    padding: 20px 50px;
    font-size: 14px;
    display: flex;
}
.lists-box {
    flex: 1;
    min-height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
}
.lists-box .el-input--suffix .el-input__inner{
    height: 33px;
   
}
.lists-box .el-input {
    margin-right: 10px;
}
.list-item-box{
    align-items: center;
    display: flex;
    margin-bottom: 20px;
}
.btn-icon {
    margin-left: 10px;
}
.bottom-addbtn-box {
    display: flex;
    align-items: center;
}
.bottom-wrap {
    margin-top: 40px;
    height: 30px;
}
</style>

