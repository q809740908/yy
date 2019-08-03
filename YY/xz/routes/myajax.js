//引入连接池模块
const express=require('express');
//创建路由器对象
const pool=require('../pool.js');
//添加路由
var router=express.Router();
//1.测试服务器接收ajax请求的接口
router.get("/ajaxDemo",(req,res)=>{
	res.send("第一个ajax程序");
});
//2.测试带参数的get请求
router.get("/ajaxDemo1",(req,res)=>{
	//1.接收参数
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	//2.验证接收参数成功
	if(!$uname){
		res.send("用户名未接收到");
		return;
	}
	if(!$upwd){
		res.send("密码未接收到");
		return;
	}
	//得到参数之后，连接数据库验证
	res.send("用户名为："+$uname+",密码为:"+$upwd);
});
//3.get请求登录接口（应该用post）
router.get("/login_get",(req,res)=>{
	//获取请求中数据
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	//验证数据正确的得到
	if(!$uname){
		res.send("没有获取到用户名称");
		return;
	}
	if(!$upwd){
		res.send("没有获取到用户密码");
		return;
	}
	//使用连接池访问数据库
	var sql="select * from xz_user" 
	+" where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		console.log(result);
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("用户名或密码错误");
		}
	});
});
//4.post请求登录接口
router.post("/login_post",(req,res)=>{
	//获取请求中数据
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//验证数据正确的得到
	console.log($uname);
	console.log($upwd);
	if(!$uname){
		res.send("没有获取到用户名称");
		return;
	}
	if(!$upwd){
		res.send("没有获取到用户密码");
		return;
	}
	//使用连接池访问数据库
	var sql="select * from xz_user" 
	+" where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		console.log(result);
		if(result.length>0){
			console.log("aaaaaaaaaaaaa");
			res.send("登录成功");
		}else{
			res.send("用户名或密码错误");
		}
	});
});
//5.使用get获取用户列表
router.get("/userlist",(req,res)=>{
 //连接池查询所有用户
 pool.query("select * from xz_user",(err,result)=>{
		if(err) throw err;
		res.send(result);
 });
});
//导出路由器对象
module.exports=router;