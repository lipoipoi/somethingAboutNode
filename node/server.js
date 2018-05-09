var http = require("http");
var fs = require("fs");
var path = require('path');
var express = require('express');
var app=express();
  app.get('/getAllFloder',function(req,res){
        fs.readdir(req.query.path,function(err,files){
          //声明一个数组存储目录下的所有文件夹
          var floder = [];
          //从数组的第一个元素开始遍历数组
        (function iterator(i){
          //遍历数组files结束
          if(i==files.length){
            res.send(floder);
            return false;
          }
          //遍历查看目录下所有东西，并匹配html
            fs.stat(req.query.path+files[i],function(err,stats){
                  //如果是文件夹，就放入存放文件夹的数组中
                  if(path.extname('/'+files[i])=='.html'){
                    floder.push(path.basename('/'+files[i]))
                  }
                  iterator(i+1);
            })
          })(0)
      })
  })
  app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
  })
var server = app.listen(8888, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})