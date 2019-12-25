<template>
    <div class="form-ctn">
        <el-form ref="form" :model="form" label-width="150px">
            <p class="shop-class-box">商品类型</p>
            <el-form-item label="商品分类">
                <el-select v-model="form.category_id" placeholder="请选择商品分类">
                    <el-option label="全部" value="0"></el-option>
                    <el-option v-for="item in categoryList" :key="item.id"  :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否预售">
                <el-radio-group v-model="form.presale">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <span class="ys-tip-text">编辑商品时，若商品存在于某个正在进行的活动中，则不能编辑是否预售。</span>
            </el-form-item>
            <el-form-item label="使用全场优惠券">
                <el-radio-group v-model="form.is_open_intergal">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                <span class="ys-tip-text">若开启,则该商品可使用全场优惠券,关闭则不能使用全场优惠券. 注意,请发布最新v10版本的小程序,才能正常使用设置成"否"</span>
            </el-form-item>

            <p class="shop-class-box">商品描述</p>
            <el-form-item label="商品名称" style="width:40%;">
               <el-input placeholder="长度<12,必填" v-model="form.title" clearable maxlength = '12'></el-input>
            </el-form-item>
            <el-form-item label="商品简短描述" style="width:40%;">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入描述内容" v-model="form.description"></el-input>
            </el-form-item>
             <el-form-item label="商品编号" style="width:40%;">
               <el-input placeholder="商品编号" v-model="form.product_num" clearable ></el-input>
            </el-form-item>
             <el-form-item label="商品标签" style="width:40%;">
                <el-switch v-model="form.swith_tag" active-color="#13ce66" inactive-color="#dcdfe6"></el-switch>
            </el-form-item>
             <el-form-item label="商品标签" v-if="form.swith_tag">
                <el-radio-group v-model="form.tag" size="mini" >
                    <el-radio v-for="item in tags" :key="item.id" :label="item.name" border></el-radio>
                </el-radio-group>
                <div>
                    <el-popover
                    ref="popover4"
                    placement="right"
                    width="400"
                    trigger="click">
                    <el-form-item label="选择标签" >
                        <el-input clearable placeholder="标签不得超过四个字" v-model="inputTag" max = '4'></el-input>
                        <div>
                            <el-button @click="isHide(0)"  size = mini type="default" >取消</el-button>
                            <el-button @click="isHide(1)"  size = mini type="primary" >确定</el-button>
                        </div>
                    </el-form-item>
                    </el-popover>
                    <el-button v-popover:popover4 size = mini type="primary" icon="el-icon-circle-plus-outline">添加标签</el-button>
                </div>
            </el-form-item>


            <p class="shop-class-box">供应商信息</p>
            <el-form-item label="供应商名称">
                <el-input clearable placeholder="供应商名称" v-model="form.supplier_idr"></el-input>

                <!-- <el-select v-model="form.supplier_id" placeholder="请选择供应商名称">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select> -->
                <span class="ys-tip-text">非供应商创建的商品选择了供应商标签，则该商品由平台自己供货。</span>
            </el-form-item>
            <el-form-item label="供货价(成本)" style="width:40%;">
                <el-input placeholder="请输入供货价(成本)" v-model="form.cost_price">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <p class="shop-class-box">价格信息</p>
            <el-form-item label="成本价" style="width:40%;">
                <el-input placeholder="请输入成本价" v-model="form.cost_price">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="市场价" >
                <el-input placeholder="请输入市场价" v-model="form.market_price" style="width:40%;">
                    <template slot="append">元</template>
                </el-input>
                <span class="ys-tip-text">若开启了会员等级功能, 则不同等级的会员,在此团购价的基础上,享受会员特权的折扣价,若商品关闭会员等级优惠,依旧赠送成长经验值</span>
            </el-form-item>
            <el-form-item label="团购价" style="width:40%;">
                <el-input placeholder="请输入团购价" v-model="form.price">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <p class="shop-class-box">基础库存</p>
            <el-form-item label="库存" style="width:40%;">
                <el-input placeholder="请输入库存" v-model="form.stock">
                </el-input>
            </el-form-item>
            <el-form-item label="基础销量" >
                <el-input placeholder="请输入基础销量" v-model="form.basic_sale_num" style="width:40%;">
                </el-input>
            </el-form-item>
            <el-form-item label="基础关注人数" >
                <el-input placeholder="请输入基础关注人数" v-model="form.base_uv" style="width:40%;">
                </el-input>
                <span class="ys-tip-text">若设置 -> 商家设置 -> 基础信息里，小程序首页模板选择了模板二，则小程序首页商品展示总关注人数 = 基础关注人数 + 真实关注人数</span>
            </el-form-item>
            <el-form-item label="限购方式">
                <el-radio-group v-model="form.limit_type">
                    <el-radio :label="1">累计限购</el-radio>
                    <el-radio :label="2">活动限购</el-radio>
                </el-radio-group>
                <span class="ys-tip-text">累计限购为每个人总共可购买的件数,默认限购数量为0,0或者不填表示不限购</span>
            </el-form-item>
            <el-form-item label="限购数量" >
                <el-input placeholder="请输入限购数量" v-model="form.limit_num" style="width:40%;">
                </el-input>
            </el-form-item>

            <p class="shop-class-box">佣金信息</p>
            <el-form-item label="佣金类型">
                <el-radio-group v-model="form.commission_type">
                    <el-radio :label="1">固定佣金</el-radio>
                    <el-radio :label="0">比例佣金</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="form.commission_type === 1 ? '一级团长佣金' : '一级团长佣金比例'" style="width:40%;">
                <el-input v-show="form.commission_type === 1" placeholder="请输入一级团长佣金" v-model="form.commission">
                    <template slot="append">元</template>
                </el-input>
                <el-input v-show="form.commission_type != 1" placeholder="请输入一级团长佣金比例" v-model="form.commission_ratio">
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item :label="form.commission_type === 1 ? '二级团长佣金' : '二级团长佣金比例'" >
                <el-input v-show="form.commission_type === 1" placeholder="请输入二级团长佣金" v-model="form.second_commission" style="width:40%;">
                    <template slot="append">元</template>
                </el-input>
                <el-input v-show="form.commission_type != 1" placeholder="请输入二级团长佣金比例" v-model="form.second_commission_ratio" style="width:40%;">
                    <template slot="append">%</template>
                </el-input>
                <span class="ys-tip-text">推客的下级会员下单,推客得一级会员佣金</span>
            </el-form-item>

            <p class="shop-class-box">会员营销</p>
            <el-form-item label="会员等级优惠">
                <el-radio-group v-model="form.spreader_commission_type">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                 <span class="ys-tip-text">开启会员等级，商品默认开启会员等级优惠。此处选择关闭，则该商品不参与会员等级优惠。</span>
            </el-form-item>

            <p class="shop-class-box">满减优惠</p>
            <el-form-item label="是否参加满减">
                <el-radio-group v-model="form.open_full_reduction">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                 <span class="ys-tip-text">若开启，则该商品参加满减优惠活动；若设置否，则商品不参加满减优惠。注意：请发布最新v9版本的小程序，才能正常使用设置成"否"</span>
            </el-form-item>

            <p class="shop-class-box">运费信息</p>
            <el-form-item label="运费">
                <el-radio-group v-model="form.exemption">
                    <el-radio :label="0">包邮</el-radio>
                    <el-radio :label="1">固定运费</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <div class="bottom-wrap">
                    <el-button class="cancel-btn">取消</el-button>
                    <el-button class="cancel-btn" type="primary" @click="onSubmit">保存</el-button>
                </div>
            </el-form-item>
        </el-form>
        
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
            tags:[
                {id:0, name:'次日达'}
            ],
            inputTag: ''
        }
        
    },
    computed:{
        ...mapState(['categoryList'])
    },
     methods:{
         isHide(e){
             
             if (e) {
                 this.tags.push({
                     id: this.tags.length,
                     name: this.inputTag
                 })
             }
             this.$refs.popover4.doClose()
             this.inputTag = ''
         },
         onSubmit(){

             this.$store.state.addShopForm1 = Object.assign({},this.form,{id:this.$route.params.id},{supplier_id:2})
             
             console.log(this.$store.state.addShopForm1);
             
             if (this.form.title) {
                 this.$emit('changeTab',1)
             } else {
                 this.$message({
                    message: '商品名称必须填写',
                    type: 'warning'
                });
             }
             
             
         },
          ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag'
        ])

     },
    created(){
      console.log(this.$route.params.id);
      
    }
}
</script>
<style>
.form-ctn {
    flex: 1;
    background-color: #fff;
}
.shop-class-box {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    font-size: 14px;
    font-weight: 700;
    box-sizing: border-box;
    padding-left: 20px;
}
.ys-tip-text {
    font-size: 12px;
    color: #999;
    margin-left: 50px;
}
.bottom-wrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.cancel-btn {
    margin-right: 30px;
}
</style>

