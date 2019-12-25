<template>
    <div class="form-ctn">
        <div class="tw-wrap"> 
            <div class="tw-item-box">
                <div class="describe">
                    <p class="label">描述</p>
                    <!-- <el-input style="width:90%;"  type="textarea" autosize  placeholder="请输入内容"  v-model="obj.ms">
                    </el-input> -->
                    <el-upload
                    v-if="!dialogImageUrl"
                    class="img-box"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                    <el-input style="width:90%;"  type="textarea" autosize  placeholder="请输入内容"  v-model="obj.msone">
                    </el-input>
                    </el-dialog>
                </div>
            </div>
        </div>
        
       <div class="bottom-wrap">
            <el-button @click="tabClick(0)" size = 'mini'>取消</el-button>
            <el-button @click="tabClick(1)" size = 'mini' type="primary">上一步</el-button>
            <el-button size = 'mini' type="primary" @click="submit">保存</el-button>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
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
            submitLists:[],
            dialogImageUrl: '',
            dialogVisible: false
        }
        
    },
     methods:{
         ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag', 'postGoodsEdit'
        ]),
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        submit(){
            console.log(this.submitLists);
            this.postGoodsEdit(this.callBack)
            
        },
        callBack(e){

            if (e === 200) {
                this.$message({
                    type: 'success',
                    message: `保存成功！`
                });
            } else {
                this.$message({
                    type: 'error',
                    message: `保存失败！`
                });
            }
        },
         tabClick(e){
            if (e === 0) {
                this.$router.push('/shopList')
            } 
            else if(e === 1) {
                this.$emit('changeTab',3)
            }
        }
     },
    created(){
        
    }
}
</script>
<style>
.form-ctn {
    flex: 1;
    background-color: #fff;
}
.tw-wrap {
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.bottom-wrap {
    margin-top: 40px;
    height: 30px;
}
.tw-item-box {
    min-height: 532px;
    width: 325px;
    background-color: antiquewhite;
}
.describe {
    padding: 0 20px 20px;
}
.img-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
.describe .el-upload-list--picture-card{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

