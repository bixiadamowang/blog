import axios from 'axios'

export function login (url, data) {
  return axios({
    url:url,
    method: 'post',
    data: data
  })
}
export function register (url, data) {
  return axios({
    url:url,
    method: 'post',
    data: data
  })
}