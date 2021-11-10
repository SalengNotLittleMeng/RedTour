import { AsyncStorage } from 'react-native';

export default class DataStores {
  saveData(url, data, callback) {
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }
  _wrapData(data) {
    return { data: data, timestamp: new Date().getTime() };
  }

  // 获取本地数据
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        // get成功
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            // 保存的非json类型数据
            reject(e);
            console.log(e);
          }
        } else {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  // 获取网络数据
  // fetchNetData(url) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(url)
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw new Error('Network response was not ok');
  //       })
  //       .then((responseData) => {
  //         this.saveData(url, responseData);
  //         resolve(responseData);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }

  /**
   * 获取数据，优先获取本地数据，如果无本地数据或本地数据过期则获取网络数据
   * @param url
   * @param flag
   * @returns {Promise}
   */
  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then((wrapData) => {
          if (wrapData && DataStores.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag)
              .then((data) => {
                resolve(this._wrapData(data));
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        // 获取本地数据过程中有任何错误时
        .catch((error) => {
          this.fetchNetData(url, flag)
            .then((data) => {
              resolve(this._wrapData(data));
            })
            .catch((error) => {
              reject(error);
            });
        });
    });
  }

  /**
   * 检查timestamp是否在有效期内
   * @param timestamp 项目更新时间
   * @return {boolean} true 不需要更新,false需要更新
   */
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    } //有效期4个小时
    return true;
  }
}
