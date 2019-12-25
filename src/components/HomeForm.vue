<template>
    <div class="form-ctn">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品分类</span>
            <el-button size = mini style="margin-left:20px; float:right;" type="success" @click="addNewClass">添加分类</el-button>
        </div>
        <!-- <el-form :inline="inline" :model="form" class="demo-form-inline">
            <el-form-item label="商品分类">
                <el-select v-model="form.classification" placeholder="-- 请选择 --">
                    <el-option label="全部" value="0"></el-option>
                    <el-option v-for="(item,index) in categoryList" :key="index"  :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form> -->
        </el-card>
        <el-dialog class="dialog-m" title="新增分类" :visible.sync="vis" @close='closeDialog'>
            <el-form :model="newForm">
               
                <el-form-item v-if="isShowSelect" label="上级分类" :label-width="formLabelWidth">
                     <el-select  v-model="newForm.parent_id" placeholder="请选择" @change = 'change'>
                         <el-option label="全部" value="0"></el-option>
                        <el-option v-for="(item,index) in categoryList" :key="index"  :label="item.title" :value="item.id"></el-option>
                
                    </el-select>
                </el-form-item>
                 <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="newForm.title" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="分类图标" :label-width="formLabelWidth">
                     <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                 <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input v-model="newForm.sort" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="商品参数" :label-width="formLabelWidth">
                     <el-popover
                        class="popv"
                        ref="popover4"
                        placement="right"
                        width="250"
                        v-model="visible2"
                        trigger="click">
                        <el-form :model="csForm" class="cs-form">
                            <p>添加参数</p>
                            <el-form-item >
                                <el-input v-model="csForm.cs" placeholder="请输入参数名称"></el-input>
                            </el-form-item>
                            <el-form-item class="pop-box">
                                <el-button type="text" @click="addCS(0)">取消</el-button>
                                <el-button size = mini type="primary" @click="addCS(1)">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </el-popover>
                    <el-button v-popover:popover4 size =  mini type="primary" icon="el-icon-circle-plus-outline">商品参数</el-button>
                    <span class="tip-text">（设置的商品参数，在添加商品，选择此分类时展示）</span>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-tag
                        v-for="tag in newForm.tags"
                        :key="tag"
                        closable
                        @close="handleClose(tag)"
                        >
                        {{tag}}
                    </el-tag>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="onCancel">取 消</el-button>
                <el-button type="primary" @click="onOk">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '../utils/api'
export default {
    props:{
        form:{
            type:Object,
            required:true,
        },
        newForm:{
            type: Object,
        },
        dialogFormVisible:{
            type:Boolean,
            default:()=>{
                return false
            }
        },
        categoryList: {
            type: Array
        },
        addID: {
            type: Number
        },
        parentID: {
            type: Number
        },
        isShowSelect: {
            type: Boolean
        }
    },
    data(){
        return{
            inline:true,
            classifications:[
           ],
            mform:{
                classification: '0'
            },
            formLabelWidth: '120px',
             dialogImageUrl: '',
            dialogVisible: false,
            csForm:{},
            visible2: false,
            vis:false,
            isAdd: true,
            options: [
                {
                    label: '水果',
                    id:1
                },
                {
                    label: '服装',
                    id:12
                },
                {
                    label: '电子',
                    id:13
                },

            ]
        }
        
    },
     watch: {
        dialogFormVisible (newValue, oldValue) {
        this.vis = newValue
        }
    },
    methods:{
      handleChange(value) {
        console.log(value);
      },
      onSubmit(){
          this.$emit('search')
      },
      addNewClass(){
          this.$emit('addNewClass')
      },
      closeDialog(){
           this.$emit('cancelNewClass',) 
      },
       handleChange(value) {
        console.log(value);
      },
      change(e){
        //   console.log(this.newForm.parent_id);
          
        //  this.$set(this.newForm.parent_id)
        //  let item = this.categoryList.filter((ele)=>{
        //      console.log(ele);
        //       return ele.id == e
        //   })
        //   this.$emit('change',{id:e, title:item[0].title})
      },
      onOk(){
          
          let arr = []
          for (let index = 0; index < this.newForm.tags.length; index++) {
              const element = this.newForm.tags[index];
              let name = element.name;
              arr.push(element)
          }
          let obj = {
              url: `/goods/category/ajax-edit?id=${this.parentID}`,
              form:{
                title: this.newForm.title||'',
                icon: '',
                sort: this.newForm.sort,
                parent_id: this.newForm.parent_id,
                level: 1,
                para:arr
              }
          }
        console.log(obj);
        
           api.postGoodsCategoryAdd(obj).then((res)=>{
               console.log(res.data.message);
               if (res.data.code == 200) {
                   this.vis = false
                   this.$message({
                       message:'添加成功',
                       type: 'success'
                   })
                   obj.form = {}
                   this.$emit('getCategoryList')
               }else {
                   this.$message({
                       message:`${res.data.message}`,
                       type: 'error'
                   })
               }
           })
           
      },
      onCancel(){
         this.vis = false 
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      addCS(type){
          
            if (type === 1 && this.csForm.cs) {
                console.log(this.newForm.tags,this.csForm);
                
                this.newForm.tags.push(this.csForm.cs)
                this.visible2 = !this.visible2;
                console.log(this.newForm.tags);
                
            }
            if(type === 1 && !this.csForm.cs){
                    this.$message('请添加参数名称');
            }
            if (type === 0) {
                this.visible2 = !this.visible2;
            }
            
            this.csForm = {}
            
      },
      handleClose(tag) {
        this.newForm.tags.splice(this.newForm.tags.indexOf(tag), 1);
      },
      
    },
    created(){
        console.log(this.newForm,this.categoryList);
        
    }
}
</script>
<style>
.form-ctn {
    flex: 1;
    background-color: #fff;
}
.form-ctn .box-card {
    margin-top: 15px;
}
.clearfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tip-text {
    font-size: 14px;
    color: #fe4c56;
}
.dialog-m .el-input {
    width: 60%;
}
.cs-form .el-input {
     width: 90%;
}
.pop-box{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
.dialog-m .el-tag {
    margin-right: 10px;
}
.left-ctn .el-card {
    overflow-y: scroll;
}
</style>

