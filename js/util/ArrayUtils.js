/**
 * Created by xieshangwu on 2017/10/1.
 */

export default class ArrayUtils{
  static updateArray(array, item) {
    for(let i=0, len=array.length; i<len; i++) {
      let temp = array[i];
      if(temp === item) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
  }
}