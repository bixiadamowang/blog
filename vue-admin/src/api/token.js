
// 导入请求公用方法
import {
    request
} from '../utils/axiosFun';

/**
 * 获取用户
 * @params：{json}
 * @returns：{json}
 */
export const getUserInfo = () => {
    return request("get", "/admin/user/info", {})
};
/**
 * 获取用户菜单
 * @params：{json}
 * @returns：{json}
 */
export const GetMenu = () => {
    return request("get", "/admin/menu", {})
};

export const fetchList = (query) => {
    return request('get', '/admin/token/page', query, "Y")
}

export const delObj = (token) => {
    return request('delete', '/admin/token/' + token, {})
}