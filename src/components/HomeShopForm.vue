<template>
    <div class="form-ctn">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品列表</span>
            <div>
                <el-button size = mini style="margin-left:20px;"  type="success" @click="addNewClass(1)">添加商品</el-button>
                <el-button size = mini  type="success" @click="addNewClass(2)">佣金设置</el-button>
            </div>
           
        </div>
        <el-form :inline="inline" :model="form" class="demo-form-inline" :label-position="labelPosition">
            <!-- <el-form-item label="所在城市" :label-width="formLabelWidth">
                <el-input v-model="newForm.addr" ></el-input>
            </el-form-item> -->
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="newForm.title" ></el-input>
            </el-form-item>
            <el-form-item label="商品编码" placeholder = '商品编码' :label-width="formLabelWidth">
                <el-input v-model="newForm.product_num" ></el-input>
            </el-form-item>
            <el-form-item label="商品类别" :label-width="formLabelWidth">
                <el-select v-model="newForm.category_id" placeholder="-- 请选择 --">
                    <el-option v-for="(item,index) in categoryList" :key="index"  :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否预售" :label-width="formLabelWidth">
                <el-select v-model="newForm.presale" placeholder="-- 请选择 --">
                    <el-option v-for="(item,index) in classifications" :key="index"  :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否合伙人供货" :label-width="formLabelWidth">
                <el-select v-model="newForm.is_supply" placeholder="-- 请选择 --">
                    <el-option v-for="(item,index) in classifications" :key="index"  :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否积分抵扣" :label-width="formLabelWidth">
                <el-select v-model="newForm.is_open_intergal" placeholder="-- 请选择 --">
                <el-option v-for="(item,index) in classifications" :key="index"  :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        </el-card>
        <el-dialog
            title="佣金设置"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form :model="form">
                <el-form-item label="佣金种类" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.commission_type">
                        <el-radio v-for="(item, index) in yjType" :key="index" :label="parseInt(item.id)">{{item.label}}</el-radio>
                    </el-radio-group>
                    <p class="dialog-tip-text">此设置对新增商品有效,商品保存后,该商品佣金方式不随系统设置改变。</p>
                </el-form-item>
                <div v-if="form.commission_type ==2">
                    <el-form-item label="一级团长佣金比例" :label-width="formLabelWidth">
                         <el-input v-model="form.commission_ratio" style="width:160px;">
                            <template slot="append">%</template>
                        </el-input>
                        <p class="dialog-tip-text">若设置为比例佣金，一级团长获得的佣金为商品实付金额（不包含优惠金额和邮费）* 一级团长佣金比例</p>

                    </el-form-item>
                    <el-form-item label="二级团长佣金比例" :label-width="formLabelWidth">
                         <el-input v-model="form.second_commission_ratio" style="width:160px;">
                            <template slot="append">%</template>
                        </el-input>
                        <p class="dialog-tip-text">若设置为比例佣金，直属上级团长获得的二级佣金为商品实付金额（不包含优惠金额和邮费）* 二级团长佣金比例</p>

                    </el-form-item>
                </div>
                <el-form-item label="会员佣金类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.spreader_commission_type">
                        <el-radio v-for="(item, index) in vipType" :key="index" :label="parseInt(item.id)">{{item.label}}</el-radio>
                    </el-radio-group>
                    <p class="dialog-tip-text">此设置对新增商品有效,商品保存后,该提成方式不随系统设置改变。</p>
                </el-form-item>
                <div v-if="form.spreader_commission_type == 2">
                    <el-form-item label="佣金比例" :label-width="formLabelWidth">
                         <el-input v-model="form.spreader_commission_ratio" style="width:160px;">
                            <template slot="append">%</template>
                        </el-input>
                        <p class="dialog-tip-text">若设置为比例佣金，推客可以获得下级会员商品实付金额（不包含优惠金额和邮费）* 一级推客佣金比例</p>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCommissionEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
    props:{
        newForm:{
            type: Object,
            default:() => {
                return{

                }
            }
        },
        categoryList: {
            type: Array
        },
    },
    data(){
        return{
            form:{
                    commission_type:   1,
                    spreader_commission_ratio:   1,
                    spreader_commission_type:   1
            },
            inline:true,
            classifications:[
                '是','否'
           ],
           yjType:[
               {id:1, label: '固定佣金'},
               {id:2, label: '比例佣金'},
           ],
           vipType:[
                {id:1, label: '固定佣金'},
                {id:2, label: '比例佣金'}, 
           ],
            formLabelWidth: '160px',
            dialogVisible: false,
            labelPosition:'center'
        }
        
    },
    methods:{
      onSubmit(){
          this.$emit('onSubmit',this.newForm)
      },
      submitCommissionEdit(){
          
          if (this.form.commission_type == 1) {
              this.form.commission_ratio = 0
              this.form.second_commission_ratio = 0
          }
          if (this.form.commission_type == 1) {
              this.form.spreader_commission_ratio = 0
          }
           this.$store.state.commissionEdit = this.form
            this.postCommissionEdit(this.callBack)
          
      },
      callBack(e){
          console.log(e);
          
           if (e === 200) {
                this.$message({
                    type: 'success',
                    message: `操作成功！`
                });
                this.dialogVisible = false
            } else {
                this.$message({
                    type: 'error',
                    message: `操作失败！`
                });
            }
          
      },
      addNewClass(e){
          console.log(e);
          if (e === 1) {
              this.$router.push('/home/addShop')
          } else {
              this.dialogVisible = true
          }
      },
      handleClose(){
          this.dialogVisible = false
      },
      ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag' ,'postCommissionEdit'
        ])
      
    },
    created(){
        this.form = this.$store.state.commissionEdit
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
.dialog-tip-text {
    font-size: 12px;
    color: #999;
    margin: 0;
    line-height: 17px;
    margin-top: 10px;
}
</style>

