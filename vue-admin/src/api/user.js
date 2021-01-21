// 导入请求公用方法
import {
  request
} from '../utils/axiosFun';

/**
 * 获取所有用户
 * @params：{json}
 * @returns：{json}
 */
export const getUserList = (data) => {
  // return request("get", "/api/sys/sysDept/findAll", {})
  return request("get", "/user/list", data, "Y") 
}
