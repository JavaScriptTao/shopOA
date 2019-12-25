<template>
    <div class="table-ctn">
        <el-table
            ref="multipleTable"
            :data="lists"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="商品信息"
            width = '300'
            >
            <template slot-scope="scope" class="item-one">
                <img class="header" src="https://img.kemanyun.com/qianhuituan/2019-06-14/2444_1560479214_ZnpgO5sami.png" alt="">
                {{ scope.row.title }}
            </template>
            </el-table-column>
            <el-table-column
            prop="price"
            label="价格信息"
            width="120">
            </el-table-column>
            <el-table-column
            prop="basic_sale_num"
            label="销售额"
            sortable>
            </el-table-column>
            <el-table-column
            prop="xiaol"
            label="销量"
            sortable>
            </el-table-column>
            <el-table-column
            prop="pv"
            label="PV"
            sortable>
            </el-table-column>
            <el-table-column
            prop="uv"
            label="UV"
            sortable>
            </el-table-column>
            <el-table-column
            label="状态"
            sortable>
                <template slot-scope="scope">
                    <el-button @click="onChangeStatue(scope.row)" type = 'text'>{{ scope.row.status == 2 ? '上架': '下架'}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作"
            width = '140'
            sortable>
                <template slot-scope="scope">
                    <el-button size = mini @click="onEdit({id:scope.row.id,type:0})" type="danger">编辑</el-button>
                    <el-button v-if="selectIndex !=3" size = mini @click="onEdit({id:scope.row.id,type:1})" type="primary">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="page-box"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
import api from '../utils/api'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
    props:{
        lists:{
            type: Array,
            default: () => {
                return []
            }        
        },
        titles:{
            type: Array,
            default: () => {
                return ['分类图标/名称', '商品数量', '创建时间', '操作']
            }
        }
    },
    data(){
        return{
            multipleSelection: [],
            currentPage4: 1,
            pageSize:10
           
        }
    },
     computed: {
        selectIndex () {
            return this.$store.state.selectIndex
        },
        page(){
            return this.$store.state.page
        }
    },
    methods:{
        ...mapActions(['getGoodsInfo']),
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let arr = []
        val.map((ele)=>{
            arr.push(ele.id)
        })
        this.$store.state.selectItems = [].concat(arr);
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.$store.state.searchForm.pageSize = val
        this.$store.state.searchForm.page = this.currentPage4
        this.getShopLists()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage4 = val
        this.$store.state.searchForm.page = val
        this.$store.state.searchForm.pageSize = this.pageSize
        this.getShopLists()
      },
      onEdit(val){
          console.log(val);
          let obj = {}
          if (val.type === 1) {  //删除
               obj = {
                    ids: [val.id],
                    status: -1
                }
          let msg = '删除'
          this.onConfirm(msg,obj)
          } else {
              
              this.$router.push(`/home/addShop/${val.id}`)
              this.getGoodsInfo({id:val.id})
              this.getCategoryList()
              
          }
          
      },
      onChangeStatue(e){
          
          let obj = {
              ids: [e.id],
              status: e.status == 3 ? 2 : 3
          }
          let msg = e.status == 3 ? '上架': '下架'
          this.onConfirm(msg,obj)
      },
      onConfirm(msg,obj){
            this.$confirm(`是否${msg}？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                }).then(() => {
                    this.$store.state.betchStatus = obj;
                    this.$emit('onChangeStatue')
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
      },
       ...mapActions([
            'getCategoryList', 'getShopLists', 'postBetchStatus', 'postBetchTag'
        ])

      
    },
    created(){
        this.getShopLists()
    }
}
</script>
<style>
.table-ctn .el-button+.el-button {
    margin-left: 2px;
}
.page-box {
    min-height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    box-sizing: border-box;
    padding-right: 10px;
}
.header {
    display: block;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border: 1px solid #f1f1f1;
}
.table-ctn .el-table .cell {
    display: flex;
    align-items: center;
}
</style>

