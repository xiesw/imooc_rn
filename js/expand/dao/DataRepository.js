/**
 * Created by xieshangwu on 2017/9/25.
 */

import {
  AsyncStorage
} from 'react-native';

export default class DataRepository {

  fetchRepository(url) {
    return new Promise((resolve, reject) => {
      //获取本地的数据
      this.fetchLoaclRepository(url)
        .then(result => {
          if (result) {
            resolve(result);
          } else {
            this.fetchNetRepository(url)
              .then(result => {
                resolve(result);
              })
              .catch(e => {
                reject(e);
              })
          }
        })
        .catch(error => {
          this.fetchNetRepository(url)
            .then(result => {
              resolve(result);
            })
            .catch(e => {
              reject(e);
            })
        })
    })
  }

  fetchLoaclRepository(url) {
    return new Promise((resolve, reject) => {
      //获取本地的数据
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(error);
        }
      })
    })
  }

  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          if(!result) {
            reject(new Error('responseData is null'));
            return;
          }
          resolve(result.items);
          this.saveRepository(url, result.items);
        })
        .catch(error => {
          reject(JSON.stringify(error));
        })
    })
  }

  saveRepository(url, items, callBack) {
    if(!url || !items) {
      return;
    }
    let wrapData = {items: items, update_data: Date.now()};
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack);
  }

  /**
   * 判断数据是否过时 30min
   * @param longTime 数据时间锉
   * @returns {boolean} true 无过期, false 过期
   */
  checkDate(longTime) {
    let cDate = Date.now();
    return cDate - longTime < (1000 * 60 * 30);
  }
}