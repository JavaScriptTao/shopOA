<template>
    <div class="table-ctn">
       <el-table
        :data="lists"
        type='index'
        :row-key='getRowKeys'
        style="width: 100%">
            <el-table-column
            label="分类图标/名称"
            prop="title">
            </el-table-column>
            <el-table-column
            label="商品数量"
            prop="name">
            </el-table-column>
            <el-table-column
            label="排序"
            prop="sort">
            </el-table-column>
            <el-table-column
            label="创建时间"
            >
                <template slot-scope="scope">
                    <span>
                        {{formtTime(scope.row)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
                <el-button v-if="scope.row.children" type="text" @click="onAddChildren({val:scope.row})">增加子类</el-button>
                <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
                <!-- <el-button type="text" @click="onDel({id: scope.row.id})">删除</el-button> -->
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
let moment = require("moment");
export default {
    props:{
        lists:{
            type: Array,
            required: true,
            default: () => {
                return [{
                        id: '12987122',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333',
                        }, {
                        id: '12987123',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333',
                        children:[]
                        }, {
                        id: '12987125',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333',
                        children:[]
                        }, {
                        id: '12987126',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333',
                        children:[]
                    }]
            }
        },
        titles:{
            type: Array,
            default: () => {
                return ['分类图标/名称', '商品数量', '创建时间', '操作']
            }
        },
        loading :{
            type:Boolean
        }
    },
    data(){
        return{
           expands: [],
           getRowKeys (row) {
              return row.id
            },
            isShowHeader:false,
            listItem:{
                children:[]
            },
            isShowHeader: false
        }
    },
    methods:{
      // 折叠面板每次只能展开一行
          expandSelect (row, expandedRows) {
            var that = this
            if (expandedRows.length) {
              that.expands = []
              if (row) {
                that.expands.push(row.id)
              }
            } else {
              that.expands = []
            }
          },
          onAddChildren(val){
              this.$emit('addNewChildren',val)
          },
          onDel(e){
              
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
          },
          onEdit(val){
            this.$emit('editClass', val)
          },
          formtTime(e){
              let tim = parseInt(e.created_at) 
              
              return moment(tim).format('YYYY-MM-DD HH-mm')
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
.form-ctn .box-card {
    margin-top: 15px;
}
.clearfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-box {
    width: 100%;
    height: 44px;
    background-color: antiquewhite;
    color: #888;
    background: linear-gradient(#f2f2f2 0%, #f2f2f2 100%, #e4e4e4 100%, #e4e4e4 100%);
    border: 1px solid #eee;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.m-table {
    width: 100%;
    min-height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
}
.m-table-box{
    width: 100%;
}
.list-item{
    flex: 1;
    min-height: 44px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #888;
    flex-direction: column;
}
.one-item ,.list-item-chlidern{
    display: flex;
    width: 100%;
    min-height: 44px;
    align-items: center;
    justify-content: center;
}
.list-item-chlidern{
    width: 100%;
    padding-left: 30px;
}
.empty {
    height: 44px;
    display: flex;
    align-items: flex-end;
    font-size: 14px;
}
.t-label {
    display: block;
    flex: 1;
}
.t-icon {
    width: 44px;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>

