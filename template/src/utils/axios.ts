/**
 * YApi平台的各个api调用
 */
// 引入别名路径包，因为tsc不支持编译别名路径，故此需要这个包进行路径转换。

import log from "@/utils/BaseLog";
import axios from "axios";
const instance = axios.create({
    baseURL: 'https://yapi.inkept.cn/',
    timeout: 5000,
});
instance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    log.error('接口报错')
    return Promise.reject(error);
})