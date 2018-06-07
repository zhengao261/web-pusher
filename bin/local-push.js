var request = require('request');
var path = require('path');
var fs = require('fs');

module.exports = {
  
  Push: function () {
    var formData = {
      // Pass a simple key-value pair
      my_field: 'my_value',
      // Pass data via Buffers
      my_buffer: new Buffer([1, 2, 3]),
      // Pass data via Streams
      my_file: fs.createReadStreamSync("/Users/zhengao/Desktop/workspace/web-pusher/README.md"),
      my_rootdir: '/home/map/odp_test/'
    };

    request.post({
      url: 'http://47.94.81.229:8300/receiver',
      formData: formData
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // success to request 
        console.log("response",JSON.stringify(body));
      } 
    })

  },
}