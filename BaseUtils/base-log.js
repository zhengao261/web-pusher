module.exports = function () {
  return {
    base_log: (params) => {
      console.log(JSON.stringify(params, null, 2));
    },
  
    array_log: (array) => {
      console.table(array);
    }
  }
}