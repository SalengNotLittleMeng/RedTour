import axios from 'axios';
import server from './api';
import RootStore from '../mobx';
import Toast from '../components/common/Toast/Toast';
import LocalStorageUtils from '../utils/LocalStorageUtils';


// server 循环遍历输出不同的请求方法
const instance = axios.create({
    //基础路径
    baseURL: 'http://49.233.252.20:8085',
    // 请求限时
    timeout: 10000,
});
// 包裹循环遍历出的请求方法
let Http = {};
for (let key in server) {
    let api = server[key]; // url method

    Http[key] = async(
        params,
        supplyUrl = '',
        isFormData = false,
        config = {},
    ) => {
        // let url = api.url;
        let newParams = {};
        if (params && isFormData) {
            newParams = new FormData();
            for (let i in params) {
                newParams.append(i, params[i]);
            }
        } else {
            newParams = params;
        }
        let response;
        if (
            api.method === 'post' ||
            api.method === 'put' ||
            api.method === 'patch'
        ) {
            try {
                response = await instance[api.method](
                    `${api.url}${supplyUrl}`,
                    newParams,
                    config,
                );
            } catch (e) {
                response = e;
            }
        } else {
            config.params = newParams;
            try {
                response = await instance[api.method](`${api.url}${supplyUrl}`, config);
            } catch (e) {
                response = e;
            }
        }
        return response;
    };
}
// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // // 加入token
        LocalStorageUtils.get('token').then((token) => {
            RootStore.userStore.setToken(token.value);
        });
        let token = RootStore.userStore.allData.accessToken;
        config.headers.ANSWER_ACCESS_TOKEN = token;

        return config;


    },
    (err) => {
        console.log(err);
    },
);

// 响应拦截器
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        if (err.response.status === 401) {
            Toast.message('请先登录');
            RootStore.userStore.infoRemove({
                accessToken: '',
                refreshToken: null,
                userId: '',
                name: '',
                age: '',
                gender: '',
                password: '',
                img: '',
            });
            RootStore.globalStore.allData.Socket.emit('disconnect');
            NavigationHelper.goBack();
            NavigationHelper.navigate('Logintwo');
        }
        console.log('请求错误', err.response);
    },
);
export default Http;
Http.init = function(helper, name = 'Http') {
    global[name] = helper;
};