// 导入请求公用方法
import {
  request
} from '../utils/axiosFun';

/**
 * 获取所有用户
 * @params：{json}
 * @returns：{json}
 */
export const getBlogList = (data) => {
  // return request("get", "/api/sys/sysDept/findAll", {})
  return request("get", "/blog/list", data, "Y") 
}
