import Vue from 'vue';
import Vuex from 'vuex';
import api from './utils/api'

Vue.use(Vuex);

const SET_TOKEN = 'SET_TOKEN';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_PERMISSIONS = 'SET_PERMISSIONS';
const SET_ERR_MSG = 'SET_ERR_MSG';

const GET_C_LIST = 'GET_C_LIST';
const CHANGE_TOAST_STATE = 'CHANGE_TOAST_STATE'
const IS_LOADING = 'IS_LOADING'
const GET_SHOP_LIST = 'GET_SHOP_LIST'
const GOODS_INFO = 'GOODS_INFO'

export default new Vuex.Store({
  state: {
    crmToken: JSON.parse(localStorage.getItem('crmToken')) || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
    errMsg: '',
    categoryList:[],
    shopList:[],
    isToastShow: false,
    isLoading: true,
    searchForm: {
      status: '',
      title: '',
      presale: 0,
      product_num: '',
      is_supply: 0,
      is_open_intergal: 0,
    },
    selectItems: [],
    betchStatus: {},
    titles:[
      {id:'', label:'全部商品',value:'' },
      {id:2, label:'已上架'  ,value:0},
      {id:3, label:'未上架'  ,value:1},
      {id:-1, label:'已删除'  ,value:2},
      {id:0, label:'待审核'  ,value:0},
      {id:1, label:'审核成功',value:3},
      {id:4, label:'审核失败',value:4}
  ],
    selectIndex: 0,
    editForm: {},
    addShopForm1:{
      ImgVideo:{
        video:[],
        images:[]
      }
    },
    GoodSkuList:[],
    goodsInfo: {},
    commissionEdit:{
      commission_type:1,
      commission_ratio:'',
      second_commission_ratio:'',
      spreader_commission_type:1,
      spreader_commission_ratio:0,
      city_dividend_type:0,
      city_dividend:''
    },
    page:{},
    aliData:{},
    file:{
      drive:'oss'
    },
    ImgVideo:{
      images:[],
      video:[]
    },
    GoodContent:{
      para:[],
      content:'',
      after_sale:''
    },
    SkuDetail:{
      attribute:'',
      values:[]
    }
  },
  getters: {
    getUserInfo: s => s.userInfo,
  },
  mutations: {
    [SET_USER_INFO](s, userInfo) {
      s.userInfo = userInfo;
    },
    [SET_TOKEN](s, crmToken) {
      s.crmToken = crmToken;
    },
    [SET_PERMISSIONS](s, permissions) {
      s.permissions = permissions;
    },
    [SET_ERR_MSG](s, errMsg) {
      s.errMsg = errMsg.length < 20 ? errMsg : '系统错误，请联系技术同事！';
    },
    [GET_C_LIST] (s, categoryList) {
      s.categoryList = categoryList
    },
    [CHANGE_TOAST_STATE] (s ,isToastShow) {
      s.isToastShow = isToastShow
    },
    [IS_LOADING] (s ,isLoading) {
      s.IS_LOADING = isLoading
    },
    [GET_SHOP_LIST] (s, categoryList){
      s.shopList = categoryList
    },
    [GOODS_INFO] (s, info){
      s.goodsInfo = info
    },
    changeState(s,e){
      s.searchForm = e
    },
   
  },
  actions: {
    setErrMsg({ commit }, errMsg) {
      commit(SET_ERR_MSG, errMsg);
    },
    setToken({ commit }, crmToken) {
      localStorage.setItem('crmToken', JSON.stringify(crmToken));
      commit(SET_TOKEN, crmToken);
    },
    setUserInfo({ commit }, userInfo) {
      commit([SET_USER_INFO], userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    setPermissions({ commit }, permissions) {
      commit([SET_PERMISSIONS], permissions);
      localStorage.setItem('permissions', JSON.stringify(permissions));
    },
    setLogout({ commit }) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('permissions');
      localStorage.removeItem('crmToken');
      commit([SET_USER_INFO], {});
    },

    getCategoryList({ commit ,state}) {
      let params = {
              url: '/goods/category/index',
              form: {}
          }
      api.getGoodsCategoryIndex(params).then((res)=>{
          state.isToastShow = false;
          res.data.map((ele)=>{
            ele.id = parseInt(ele.id)
          })          
          commit('GET_C_LIST', res.data)
          commit('IS_LOADING', false)
      })
    },
    getShopLists({commit, state}){
      state.searchForm.status = state.titles[state.selectIndex].id
      let params = {
        url: '/goods/goods/index',
        form: state.searchForm
      }
      api.getGoodsCategoryIndex(params).then((res)=>{
        
        commit('GET_SHOP_LIST', res.data.items)
        commit('IS_LOADING', false)
        state.page = res.data.page
      })
    } ,
    postBetchStatus({state},callBack){
      
      let params = {
        url: '/goods/goods/betchstatus',
        form: state.betchStatus
      }
      api.postBetchStatus(params).then((res)=>{
        callBack(res.data.code)
      })
    },
    postBetchTag({state},callBack){
      let params = {
        url: '/goods/goods/betchtag',
        form: state.editForm
      }
      api.postBetchStatus(params).then((res)=>{
        callBack(res.data.code)
      })
    },
    postGoodsEdit( {state }, callBack){
      if (state.addShopForm1.swith_tag) {
        state.addShopForm1.swith_tag = 1
      }else{
        state.addShopForm1.swith_tag = 0
      }
      let params = {
        url: '/goods/goods/edit',
        form: state.addShopForm1,
        GoodSkuList: state.GoodSkuList,
        ImgVideo: state.ImgVideo,
        GoodContent: state.GoodContent,
        SkuDetail: state.SkuDetail
      }
      api.postGoodsEdit(params).then((res)=>{
        
        callBack(res.data.code)
      })
    },
    getGoodsInfo({ commit },val){
      
      let params = {
        url: '/goods/goods/info',
        form: val
      }
      api.getGoodsCategoryIndex(params).then((res)=>{
        
        commit('GOODS_INFO', res.data)
      })
    },
    postCommissionEdit({ state }, callBack){
      let params = {
        url: '/goods/commission/edit',
        form: state.commissionEdit,
      }
      api.postGoodsEdit(params).then((res)=>{
        state.commissionEdit = res.data
        callBack(res.data.code)
      })
    },
    getAliyunPara( { state } ,callBack){
      let params = {
        url: '/get/aliyun/para',
        form: {},
      }
      api.getAliyunPara(params).then((res)=>{
        state.aliData = res.data
        callBack(res.data)
      })
    },
    postImg({state},callBack){
      let params = {
        url: '/file/images',
        form: state.file,
      }
      api.postImg(params).then((res)=>{
        callBack(res.data)
      })
      
    }
  },
});
