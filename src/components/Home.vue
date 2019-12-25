<template>
    <div class="home-ctn">
        
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select = 'selectCallback' background-color = '#304156' text-color = '#fff'>
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-goods"></i>
            <span slot="title">商品</span>
            </template>
             <el-menu-item-group>
                <el-menu-item index="1-1">商品分类1</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="1-2">商品列表2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
            <template slot="title">
            <i class="el-icon-bell"></i>
            <span slot="title">活动</span>
            </template>
             <el-menu-item-group>
                <el-menu-item index="2-1">活动列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        </el-menu>
        <div class="left-ctn">
            <el-card class="box-card box-card-one">
                <div class="l-top-wrap">
                    <transition>
                        <el-button :class="[isCollapse?'fa fa-arrow-down go':'fa fa-arrow-down aa']" class="rotate-ctn" @click="changeCollapse" type="primary" icon="el-icon-sort"></el-button>
                    </transition>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{breadcrumbItem}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            用户名称<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>版本：企业版</el-dropdown-item>
                            <!-- <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item> -->
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                 <div v-if="addShop">
                     <AddShop></AddShop>
                </div>
                <div v-else>
                    <Form :isShowSelect = 'isShowSelect' :parentID = 'parentID' :newForm = 'newForm' @change = 'change' @cancelNewClass = 'cancelNewClass' :addID = 'addID' @getCategoryList = 'getCategoryList' :categoryList = 'categoryList'  v-if="isShowItem" :form = 'form' @addNewClass = 'onAddClass' :dialogFormVisible = 'dialogFormVisible' @onOk = 'onOk'></Form>
                    <ShopForm :categoryList = 'categoryList' :newForm = 'newForm' v-else @onSubmit = 'monSubmit' :form = 'form'></ShopForm>
                    <el-card class="box-card box-card-list">
                        <div slot="header" class="clearfix">
                            <span>{{breadcrumbItem}}列表</span>
                            <div v-if="!isShowItem" class="btn-wrap">
                                <el-button @click="onPLEdit('down')" type="primary" size = 'mini'>批量下架</el-button>
                                <el-button @click="onPLEdit('up')" type="primary" size = 'mini'>批量上架</el-button>
                                <el-button @click="onPLEdit('edit')" type="primary" size = 'mini'>编辑标签</el-button>
                                <el-button @click="onPLEdit('del')" type="danger" size = 'mini'>批量删除</el-button>
                            </div>
                        </div>
                        <Table @addNewChildren = 'addNewChildren' :loading = 'loading' v-if="isShowItem" :lists = 'categoryList' @addNewClass = 'onEditClass' @editClass = 'editClass'></Table>
                        <ShopTable @onChangeStatue = 'onChangeStatue' @getShopLists = 'getShopLists' v-else :lists = 'shopList' :titles = 'titles'></ShopTable>
                    </el-card>
                </div>
                <el-dialog title="编辑标签" :visible.sync="editdialogFormVisible">
                    <el-form :model="editForm">
                        <el-form-item label="" :label-width="formLabelWidth">
                            <el-radio @change = 'onSelect' v-model="editForm.type" label="1">选择标签</el-radio>
                            <el-radio @change = 'onSelect' v-model="editForm.type" label="2">新增标签</el-radio>
                        </el-form-item>
                        <el-form-item label="" :label-width="formLabelWidth">
                        <el-select v-if="editForm.type =='1'" v-model="editForm.tag" placeholder="请选择">
                            <el-option label="全部" value="0"></el-option>
                            <el-option v-for="item in categoryList" :label="item.title" :value="item.title" :key="item.id"></el-option>
                        </el-select>
                         <el-input v-else  placeholder="请输入"  v-model="editForm.tag"  clearable></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editdialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onEditToast">确 定</el-button>
                    </div>
                </el-dialog>
                
            </el-card>
            
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import api from '../utils/api'

import Form from '@/components/HomeForm'
import ShopForm from '@/components/HomeShopForm'
import Table from '@/components/HomeTable'
import ShopTable from '@/components/HomeShopTable'
import AddShop from '@/components/AddShop'
export default {
    components:{
        Form, Table, ShopForm, ShopTable, AddShop
    },
    props:{
       
        type:{
            type: String
        },
        defaultActive:{
            type: String
        }
      

    },
    data(){
        return{
            formLabelWidth:'10px',
            form:{
                classification: '0'
            },
            editForm: {
                type:'1'
            },
            title:'home',
            isCollapse: false,
            breadcrumbItem: '',
            isShowItem: true,
            dialogFormVisible: false,
            editdialogFormVisible: false,
            addShop:false,
            loading: true,
            titles:[
                    {id:-2, label:'全部商品',value:'' },
                    {id:2, label:'已上架'  ,value:0},
                    {id:3, label:'未上架'  ,value:1},
                    {id:-1, label:'已删除'  ,value:2},
                    // {id:0, label:'待审核'  ,value:0},
                    // {id:1, label:'审核成功',value:3},
                    // {id:4, label:'审核失败',value:4}
                ],
            addID: 0,
            newForm:{
                    status: '',
                    title: '',
                    presale: 0,
                    product_num: '',
                    is_supply: 0,
                    is_open_intergal: 0
            },
            parentID: 0,
            isShowSelect: true

        }
    },
    computed:{
        ...mapState([
            'isLoading','categoryList', 'shopList', 'selectItems'
        ]),
        lists(state){
            return state.categoryList
        }
    },
    methods:{
        ...mapMutations([
            'GET_C_LIST', 'GET_SHOP_LIST'
        ]),
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeCollapse(){
          this.isCollapse = !this.isCollapse;
        
      },
      handleCheckAllChange(){

      },
      selectCallback(k,p){
          
          if (k === '1-1') {

            this.breadcrumbItem = '商品分类'
            this.isShowItem = true
            this.getCategoryList();
            this.$router.push({
                path:'/home',
            })
        }else if (k === '1-2'){

            this.breadcrumbItem = '商品'
            this.isShowItem = false
            this.getShopLists(k=0)
            this.$router.push({
                path:'/shopList',
            })
        } 
          
      },
      onSelect(e){
          console.log(e);
          
          this.editForm = {
              tag:'',
              type: e
          }
      },
        monSubmit(e){

            this.$store.commit('changeState',e)
            this.getShopLists();
        },
        onAddClass(){
            this.dialogFormVisible = !this.dialogFormVisible;
            this.parentID = 0
            this.newForm  = {
                tags: []
            }
        },
        onChangeStatue(){
            console.log(1111);
            
             this.postBetchStatus(this.callBack)
        },
        editClass(e){
           
            this.dialogFormVisible = !this.dialogFormVisible;
             this.newForm = {
                parent_id: parseInt(e.parent_id),
                title: e.title,
                sort: e.sort,
                tags: JSON.parse(e.para)
            }
            this.parentID = parseInt(e.id)
            this.isShowSelect = parseInt(e.parent_id) !=0

        },
        addNewChildren(e){

            this.dialogFormVisible = !this.dialogFormVisible;
            this.newForm = {
                parent_id: parseInt(e.val.id),
                title: e.val.title,
                sort: e.val.sort,
                tags: JSON.parse(e.val.para)
            }
            this.parentID = parseInt(e.id)

        },
        change(e){
            this.newForm.parent_id = e.id
            this.newForm.title = e.title
        },
        onPLEdit(e){
           
           let msg = ''
           if (this.selectItems.length) {
               if (e === 'down') {  // 下架
                   this.$store.state.betchStatus = {
                       ids:this.selectItems,
                       status:3
                   }
                   msg = '批量下架'

                    this.$confirm(`此操作将${msg}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                   this.postBetchStatus(this.callBack)
                   
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
                });
               } else if (e === 'up') { // 上架
                    this.$store.state.betchStatus = {
                       ids:this.selectItems,
                       status:2
                   }
                   msg = '批量上架'
                    this.$confirm(`此操作将${msg}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                   this.postBetchStatus(this.callBack)
                   
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
                });
               } else if ( e === 'edit') {  // 编辑标签
                    this.editdialogFormVisible = !this.editdialogFormVisible
                    
               } else { // 删除
                    this.$store.state.betchStatus = {
                       ids:this.selectItems,
                       status:-1
                   }
                   msg = '批量删除'
                    this.$confirm(`此操作将${msg}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                   this.postBetchStatus(this.callBack)
                   
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
                });
               }
               
           } else {
               this.$message({
                    message: '请选择您要操作的数据！',
                    type: 'warning'
                });
           }
        },
        onEditToast(){
             this.editdialogFormVisible = !this.editdialogFormVisible
             this.editForm.ids = this.selectItems
             this.$store.state.editForm = this.editForm
             this.postBetchTag(this.callBack)
        },
        callBack(e){

            if (e === 200) {
                this.$message({
                    type: 'success',
                    message: `操作成功！`
                });
            } else {
                this.$message({
                    type: 'error',
                    message: `操作失败！`
                });
            }
            this.getShopLists();
        },
        onEditClass(e){

            if (e.type === 'add') {
                this.addID = 0
                if (e.val) {
                    this.newForm.parent_id = parseInt(e.id)
                    this.newForm.title = e.val.val.title
                    this.newForm.sort = e.val.val.sort
                    this.newForm.tags = e.val.val.tags
                }else{
                    this.newForm.parent_id = 0
                }
                
            } else {
                this.addID = parseInt(e.id) ? parseInt(e.id) : parseInt(e.val.val.id)
                this.newForm.parent_id = parseInt(e.id) ? parseInt(e.id) : 0
                this.newForm.title = e.val.val.title||''
                this.newForm.sort = e.val.val.sort
                this.newForm.tags = JSON.parse(e.val.val.para)
            }
            this.dialogFormVisible = !this.dialogFormVisible;
            
        },
        cancelNewClass(){
            this.dialogFormVisible = !this.dialogFormVisible; 
        },
        onOk(){
            this.dialogFormVisible = false;
        },
        ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag'
        ])
    },
    created(k){
         
        if(this.type === 'addShop') {
            this.addShop = true
        } else {
            this.addShop = false
        }
        if (this.defaultActive === '1-1') {
            this.breadcrumbItem = '商品分类'
            this.isShowItem = true
            this.getCategoryList();
        }else if (this.defaultActive === '1-2'){
            this.breadcrumbItem = '商品'
            this.getShopLists();
            this.isShowItem = false
            this.getCategoryList();
        }
    }

}
</script>
<style>
.home-ctn {
    width: 100%;
    height: 100%;
    background-color:#fff;
    display: flex;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.left-ctn {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.l-top-wrap {
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
}
.l-top-wrap .el-button--primary{
    height: 50px;
    background: none;
    border: none;
    width: 50px;
    color: #304156;
}
.aa{
    transition: all 1s; 
    transform:rotate(90deg);
}
.go{
    transform:rotate(0deg);
    transition: all 1s;
}
.l-top-wrap .el-breadcrumb {
    margin-left: 20px;
}
.l-top-wrap .el-dropdown {
    position: absolute;
    right: 30px;
}
.box-card-list{
    margin-top: 15px;
}
.left-ctn .box-card-one {
    height: 100%;
}
.left-ctn .clearfix {
    justify-content: flex-start;
}
.btn-wrap {
    margin-left: 20px;
}
</style>

