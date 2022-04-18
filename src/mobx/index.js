import { observable, action } from 'mobx';
import userStore from './userStore';
import globalStore from './globalStore';
import LocalStorageUtils from '../utils/LocalStorageUtils';

class RootStore {
    constructor() {
        this.userStore = new UserStore(userStore, this);
        this.globalStore = new GlobalStore(globalStore, this);
    }
}

class UserStore {
    @observable allData = {};

    @action async avatarUpdate(data) {
        this.allData.userAvatar = data;
    }

    constructor(data) {
        this.allData = data;
    }

    // 设置用户信息
    @action async infoSet(data) {
        // 看后台传回的data是单个数据还是一个整的
        this.allData = data;
        await LocalStorageUtils.set('userInfo', data);
    }
    @action async infoSetMobx(data) {
        this.allData = {...this.allData, ...data };
    }

    // 移除用户信息
    @action async infoRemove(data) {
        // 看后台传回的data是单个数据还是一个整的
        this.allData = data;
        await LocalStorageUtils.clear();
        // await LocalStorageUtils.deleteItem('userInfo');
    }

    // 设置token
    @action async setToken(data) {
        this.allData.accessToken = data;
        await LocalStorageUtils.set('token', data);
    }
}

class GlobalStore {
    @observable allData = {};
    @observable isPlaying = true;
    constructor(data) {
            this.allData = data;
        }
        // 方法
    @action setNavigation(navigation) {
        this.allData.navigation = navigation;
    }

    @action setSearch(search) {
        this.allData.search = search;
    }
    @action setPlaying(flag) {
        this.isPlaying = flag===undefined?!this.isPlaying:flag
    }
}

export default new RootStore();