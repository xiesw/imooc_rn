/**
 * Created by xieshangwu on 2017/9/25.
 */

export default class DataRepository {
  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(JSON.stringify(error));
        })
    })
  }
}