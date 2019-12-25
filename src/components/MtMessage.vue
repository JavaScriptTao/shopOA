<template>
    <div class="mt-form-ctn">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品图片">
               <el-upload
                    action=""
                    :http-request="Upload" 
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <p class="ys-tip-text">至少上传一张商品图片。当前首页商品模板选择了 模板一，主图建议上传375 * 375px的图片，用于展示在商品图为正方形的区域。商家设置 -> 基本信息，商品图片选择了长方形，其它图片建议上传375 * 240px，展示在商品详情页。</p>
            </el-form-item>
            <el-form-item label="商品视频">
               <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">上传视频大小不能超过20M，视频支持格式：mp4, avi, mpeg, quicktime</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="bottom-wrap">
            <el-button @click="tabClick(0)"  size = 'mini'>取消</el-button>
            <el-button @click="tabClick(1)" size = 'mini' type="primary">上一步</el-button>
            <!-- <el-button @click="tabClick(2)" size = 'mini' type="primary">下一步</el-button> -->
            <el-button @click="tabClick(3)" size = 'mini' type="primary">保存</el-button>
        </div>
    </div>
</template>

<script>

import config from '../config'
import { mapActions } from 'vuex';
import axios from 'axios'
import { setTimeout } from 'timers';
export default {
    props:{
        form:{
            type:Object,
            default:()=>{
                return {

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
            dialogImageUrl: '',
            dialogVisible: false,
            fileList:[],
            file:{},
            imgs:[]
        }
    },
    methods:{
        ...mapActions(['getAliyunPara', 'postImg']),
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            console.log(file);
            
        },
        imgCallBack(e){

        //定义唯一的文件名，打印出来的uid其实就是时间戳
        
        
            const client = new OSS.Wrapper({
                                region: e.endpoint,
                                accessKeyId: e.accessId,//填入自己的id
                                accessKeySecret: e.accessSecret,//填入自己的id
                                bucket: e.bucket,
                                stsToken: localStorage.getItem('token')
                            })
                             console.log(this.file.file);
              const contens = this.file['name'].split('.');
              
             const ext = contens[contens.length - 1];
             const filename = `/shopImg/${Math.random().toString(36).substr(2)}.${ext}`;
             
             
            // var signUrl = client.signatureUrl(filename, {expires: 6000, 'process' : 'image/resize,w_300'});
            // console.log(signUrl);
           
            
            const ret = client.multipartUpload(filename, this.file.file, {}).then((result) => {
                console.log(result);
                
                vm.$message({
                type: 'success',
                message: '图片上传成功',
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        Upload(file) {

            this.file = file.file
            setTimeout(()=>{
                this.getAliyunPara( this.imgCallBack);
            })
            
            
        //    console.log(file.file);
        //    this.$store.state.file =  Object.assign({},file,{drive:'oss'})
        //    this.postImg(this.upCallBack)

            let mfile = file.file;
            let param = new FormData(); //创建form对象
            param.append('file',mfile);//通过append向form对象添加数据
            
            let config = {
            headers:{'Content-Type':'multipart/form-data'}
            }; //添加请求头
            axios.post('http://admin.qiandengli.com/file/images',param,config)
            .then(response=>{
                console.log(response.data.data.url);
                this.imgs.push(response.data.data.url)
            })

             
        },
        upCallBack(e){

        },
        tabClick(e){
            if (e === 0) {
                this.$router.push('/shopList')
            } 
            else if(e === 1) {
                this.$emit('changeTab',0)
            }
            else if(e === 2) {
                this.$emit('changeTab',2)
            }else {
                 this.$emit('changeTab',2)
                this.$store.state.ImgVideo.images = [].concat(this.imgs)
            }
        }
     
      
    },
    created(){
        
    }
}
</script>
<style>
.mt-form-ctn {
    flex: 1;
    padding-top: 20px;
    background-color: #fff;
}
.ys-tip-text {
    font-size: 12px;
    color: #999;
    margin-left: 50px;
}
.bottom-wrap {
    margin-top: 40px;
    height: 30px;
}
</style>

