/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 14:44:21
 * @LastEditTime: 2019-08-22 21:19:41
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var bodyParser = require('body-parser');
var md5=require('md5-node'); /*md5加密*/

var DB=require('../../modules/db.js');  /*引入DB数据库*/

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

router.get('/',function(req,res){
    //res.send('登录页面');
    res.render('admin/login');

})
//处理登录的业务逻辑
router.post('/doLogin',function(req,res){


    var username=req.body.username;
    var password=md5(req.body.password);  /*要对用户输入的密码加密*/
    let userInfo ={
        username,
        password
    }
    req.session.userinfo = userInfo;
    console.log('---->>>',req.session)
    // sessionStorage.setItem(JSON.stringify(userInfo));
    res.redirect('/admin/citys');  /*登录成功跳转到列表*/
})

router.get('/loginOut',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/login');
        }
    })
})


module.exports = router;   /*暴露这个 router模块*/