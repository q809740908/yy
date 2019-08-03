const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//用户注册
router .get('/reg',function(req,res){
    //获取get请求的数据
    var obj=req.query;
    //检测值是否为空
    if(!obj.uname){
      res.send({code:401,msg:'uname required'});
      //阻止往后执行
      return;
    }
    if(!obj.upwd){
      res.send({code:402,msg:'upwd required'});
      return;
    }
    if(!obj.pass){
      res.send({code:403,msg:'phone required'});
      return;
    }
    
    //执行SQL语句
    pool.query('INSERT INTO yy_login SET ?',[obj],function(err,result){
      if(err) throw err;
      console.log(result);
      //判断是否注册成功
      if(result.affectedRows>0){
        res.send({code:200,msg:'reg suc'});
      }
    });
  });
  
  
  
//添加路由
//登录
router.get("/login",(req,res)=>{
    //1:参数
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    //1.1:正则表达式验证用户名或密码
    //2:sql
  var sql = "SELECT uid FROM ";
  sql +=" yy_login WHERE uname = ?";
  sql +=" AND upwd = ?";
    //3:json
    pool.query(sql,[uname,upwd],(err,result)=>{
      console.log(result)
        if(err)throw err;
        if(result.length==0){
           res.send({code:-1,msg:"用户名或密码有误"});
        }else{
  //??缺少一步
  //将当前登录用户uid保存session
  //result=[{id:1}]
         
           res.send({code:1,msg:"登录成功"});
        }
    })
  })
  //导出路由器对象
    module.exports=router;