/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 14:44:21
 * @LastEditTime: 2019-08-22 21:03:18
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');

var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/

router.get('/',function(req,res){
    // res.send('index');
    res.redirect('/admin/login')
})

var citys=require('./admin/citys.js');
var user=require('./admin/user.js');
router.get('/citys',citys);
router.get('/user',user);

module.exports = router;   /*暴露这个 router模块*/