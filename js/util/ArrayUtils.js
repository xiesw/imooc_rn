/**
 * Created by xieshangwu on 2017/10/1.
 */

export default class ArrayUtils {

  /**
   * 更新数组,若item已经存在则将其移除,如果不存在则添加
   * @param array 传入的数组
   * @param item 确定的元素
   */
  static updateArray(array, item) {
    for (let i = 0, len = array.length; i < len; i++) {
      let temp = array[i];
      if (temp === item) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  }

  /**
   * 克隆数组
   * @param from
   * @returns {*}
   */
  static clone(from) {
    if (!from) {
      return [];
    } else {
      return from.slice(0);
    }
  }

  /**
   * 判断数组元素是否一致
   * @param arr1
   * @param arr2
   * @returns {boolean}
   */
  static isEuqal(arr1, arr2) {
    if (!(arr1 && arr2)) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0, len = arr2.length; i < len; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * 将数组中指定元素移除
   * @param arr
   * @param item
   */
  static remove(arr, item) {
    if (!arr) {
      return;
    }
    let index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

}