<template>
    <div class="gg-form-ctn">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="商品规格">
              <div class="add-shop-g">
                  <p v-if="isShowAddImg" class="sku-add" @click="addGG">+</p>
                  <div v-else>
                      <div class="add-gg-top-wrap">
                          <el-input
                            style="width:15%;"
                            v-model="gzName"
                            clearable>
                        </el-input>
                        <el-button type="text" icon="el-icon-delete" @click="closeBtn">关闭</el-button>
                      </div>
                      <div class="add-gg-bottom-wrap">
                          <el-tag
                            :key="index"
                            v-for="(tag,index) in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag.name}}
                            </el-tag>
                            <el-input
                            style="width:10%;"
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
                      </div>
                  </div>
              </div>
              <p class="tipT">
                  *商品规格请填写中文，字母或者数字，请不要填写带有空格、特殊字符或者分号、引号的规格； sku价格需大于0；
              </p>

            </el-form-item>
            <el-form-item label = 'sku价格'>
                <el-table
                    empty-text = '⚠️ 请添加规格'
                    :data="dynamicTags"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        :label="gzName"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="成本价（元）"
                        width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.cost_price"   style="width:40%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="市场价（元）">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.market_price"   style="width:80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="团购价（元）">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price"   style="width:80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="团长佣金">
                        <template slot-scope="scope" >
                            <div v-show="isBl">
                                一级: <el-input v-model="scope.row.commission"   style="width:80%"></el-input>元
                                二级: <el-input v-model="scope.row.second_commission"   style="width:80%"></el-input>元
                            </div>
                            <div v-show="!isBl">
                                一级: <el-input v-model="scope.row.commission_ratio"   style="width:80%"></el-input>%
                                二级: <el-input v-model="scope.row.second_commission_ratio"   style="width:80%"></el-input>%
                            </div>
                        </template>
                    </el-table-column>
                     <el-table-column
                        label="推客佣金">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price"   style="width:80%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="库存">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price"   style="width:80%"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
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
import { mapMutations, mapActions, mapState } from 'vuex'
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
            gzName:'规格名称',
            addSX:'',
            isShowAddImg: true,
            myRules:[],
            dynamicTags: [],
            inputVisible: false,
            inputValue: '',

        }
    },
    computed:{
        isBl(){
            return this.$store.state.addShopForm1.commission_type
        }
    },
    methods:{
       ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag', 'postGoodsEdit'
        ]),
        addGG(){
            console.log(33);
            this.isShowAddImg = !this.isShowAddImg
        },
        closeBtn(){
             this.isShowAddImg = !this.isShowAddImg
             this.dynamicTags = []
        },
        onAddGGe(){

            this.myRules.push({name:this.addSX})
        },
         handleClose(tag) {
             
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
       tabClick(e){
            if (e === 0) {
                this.$router.push('/shopList')
            } 
            else if(e === 1) {
                this.$emit('changeTab',1)
            }
            else if(e === 2) {
                this.$emit('changeTab',3)
            }else {
                this.$store.state.GoodSkuList = [].concat(this.dynamicTags)
                let arr = []
                this.dynamicTags.map((ele)=>{
                    arr.push(ele.name)
                })
                this.$store.state.addShopForm1.SkuDetail = [].concat(arr) 
                 this.$emit('changeTab',3)
                
            }
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

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
            let obj = Object.assign({},this.$store.state.addShopForm1)

            if (obj.commission_type) {
                obj.commission_ratio = 0
                obj.second_commission_ratio = 0
            } else {
                obj.commission = 0
                obj.second_commission = 0
            }
            obj.name = inputValue
            
            this.dynamicTags.push(obj);
             
        }
        this.inputVisible = false;
        this.inputValue = '';
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
.add-shop-g {
    padding: 10px;
    min-height: 70px;
    border: 1px solid #ddd;
}
.sku-add {
    display: block;
    line-height: 40px;
    background: #fff;
    border: 1px dashed #999;
    color: #999;
    font: 700 46px/40px arial;
    text-align: center;
}
.tipT{
    font-size: 12px;
    color: #999;
}
.add-gg-top-wrap {
    height: 40px;
    background-color: #eee;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
}
.add-gg-bottom-wrap {
    padding: 5px 15px;
    min-height: 30px;
}
.m-table {
    border: 1px solid #eee;
}
.gg-form-ctn .el-table--fit {
    width: 100%;
    border: 1px solid #eee;
    border-bottom: none;
}
.gg-form-ctn  .el-tag {
 margin-right: 6px;
}
</style>

