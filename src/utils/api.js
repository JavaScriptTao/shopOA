import http from './http'
const qbaseUrl = 'http://admin.qiandengli.com';
export default {
    postSiteLogin(params){
     
        return http.post(params.url,{LoginForm:params.form});

    },
    getGoodsCategoryIndex(params){

        return  http.get(qbaseUrl + params.url,params.form)

    },
    postGoodsCategoryAdd(params){
      
      return http.post(params.url, {category: params.form});

    },
    getGoodsGoodsIndex(params){

      return http.get(qbaseUrl + params.url,params.form)
    },
    postBetchStatus ( params ) {
      
      return http.post(params.url, params.form );
    },
    postGoodsEdit( params ){
      
      let obj = Object.assign({},params.form,{GoodSkuList:params.GoodSkuList},{ImgVideo:params.ImgVideo},{GoodContent:params.GoodContent},{SkuDetail:params.SkuDetail})

      return http.post(params.url, obj);
    },
    getAliyunPara(params){
      return http.get(qbaseUrl + params.url,params.form)

    },
    postImg( params ){
      
      return http.post(params.url, params.form);
    }
}
