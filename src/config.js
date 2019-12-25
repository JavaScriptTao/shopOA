// const isProd = process.env.NODE_ENV === 'prod';

// const baseUrl = isProd ? 'http://api.qiandengli.com/' : '';
const baseUrl = 'http://admin.qiandengli.com';

export default {
  sysUrl: `${baseUrl}`,
  // devServer: {
  //     proxy: {
  //       '/api': {
  //         target:'http://admin.qiandengli.com', // 你请求的第三方接口
  //         changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
  //         pathRewrite:{  // 路径重写，
  //           '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
  //         }
  //       }
  //     },
  //     https: true
  // }
  oss_host: 'http://d.oss.kuaipeilian.com',
  oss_endpoint: 'oss-cn-shanghai.aliyuncs.com',
  oss_region: 'oss-cn-shanghai',
  oss_bucket: 'dev-kpl'

};
