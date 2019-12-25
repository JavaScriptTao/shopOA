import OSS from 'ali-oss';
import config from './config'
export function client() {
    const Oss = OSS.Wrapper;
    const client = new Oss({
        region: config.oss_region,
        accessKeyId: 'response.data.data.AccessKeyId',
        accessKeySecret: 'response.data.data.AccessKeySecret',
        stsToken: 'response.data.data.SecurityToken',
        bucket: config.oss_bucket,
        endpoint: config.oss_endpoint,
      });
  return client
}