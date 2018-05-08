module.exports = {
  /**
   * @description 数组扩展，判断元素是否在数组中
   * @param { arr } arr 指定数组
   * @param { obj } 需要判断的元素
   * 
   * @return { Bollean } 是否
   */
  contains(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  },
}