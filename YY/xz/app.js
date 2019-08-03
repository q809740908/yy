const express=require('express');
//引入路由器
const userRouter=require('./routes/user.js');
const ajaxRouter=require('./routes/myajax.js');
const proRouter=require('./routes/pro.js');
//引入body-parser
const bodyParser=require('body-parser');
//创建web服务器
var server=express();
server.listen(8080);
//托管静态资源到public下
server.use( express.static('public') );
server.use( express.static('ajaxdemo') );
server.use( express.static('mypro') );
//使用body-parser中间件，将post请求的数据格式化为对象
server.use( bodyParser.urlencoded({
  extended:false
}) );
//使用路由器
//使用(挂载)的url: /user
// /user/reg
server.use('/user',userRouter);
server.use('/ajax',ajaxRouter);
server.use('/pro',proRouter);
