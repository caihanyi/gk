import axios from 'axios'
import {Message} from 'element-ui';




axios.interceptors.response.use(response => {
    // console.log('来到了response拦截success中');
    return response.data
}, err => {
    if (err && err.response) {
        console.log('返回报错！');
        switch (err.response.status) {
            case 400:
                Message.error({message: '服务器被吃了( ╯□╰ )'})
                break
            case 401:
                Message.error({message: '服务器被吃了( ╯□╰ )'})
                break
        }
    }
    return err
}
)

// const axios = originAxios.create({
//     baseURL: 'http://127.0.0.1:8080',
//     timeout: 5000
// });
let base = 'http://127.0.0.1:8080';


export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}
