const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.登陆，post
router.post("/login",(req,res)=>{
	//接收验证数据
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send("用户名不存在");
		return;
	}
	if(!$upwd){
		res.send("密码不存在");
		return;
	}
	//查询数据库
	var sql="select * from xz_user where "
	+"uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登陆成功");
		}else{
			res.send("用户名密码错误");
		}
	});
});
//2.查询用户列表
router.get("/list",(req,res)=>{
	var sql="select  * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//3删除
router.get("/deleteUser",(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send("uid未找到");
		return;
	}
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");//1表示删除成功
		}else{
			res.send("0");
		}
	});
});
//4.根据uid检索用户
router.get("/query",(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send("uid接收不到");
		return;
	}
	//查数据库 
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send("没有查出用户信息");
		}
	});
});
//5.修改用户信息
router.post("/update",(req,res)=>{
	//接收数据
	var $uid=req.body.uid;
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	var $user_name=req.body.user_name;
	var $gender=req.body.gender;
	if(!$uid){
		res.send("用户ID未接收到");	return;
	}
	if(!$uname){
		res.send("用户名未接收到");	return;
	}
	if(!$upwd){
		res.send("用户密码未接收到");	return;
	}
	if(!$email){
		res.send("邮箱未接收到");	return;
	}
	if(!$phone){
		res.send("用户电话未接收到");	return;
	}
	if(!$user_name){
		res.send("真实姓名未接收到");	return;
	}
	if(!$gender){
		res.send("用户性别未接收到");	return;
	}
	//插入数据库
	var sql="update xz_user set uname=?,"
	+"upwd=?,email=?,phone=?,user_name=?,"
	+"gender=? where uid=?";
	pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");//1表示修改成功
		}else{
			res.send("0");
		}
	});
});
//导出路由器对象
module.exports=router;