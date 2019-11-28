/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 14:44:21
 * @LastEditTime: 2019-08-22 21:18:26
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by Administrator on 2017/8/18 0018.
 */
var express=require('express');
var router = express.Router();   /*可使用 express.Router 类创建模块化、可挂载的路由句柄*/
var DB=require('../../modules/dbmysql.js');  /*引入DB数据库*/
var multiparty = require('multiparty');  /*图片上传模块  即可以获取form表单的数据 也可以实现上传图片*/
var  fs=require('fs');

router.get('/',async(req,res)=>{   
    const itemlist = await DB('SELECT * FROM book LIMIT 0,1');
    // const itemlist = await DB('SELECT * FROM book  WHERE bookname="' + title +'" limit 0,1');
    res.render('admin/bookdetail/index',{
        list: itemlist
    });
})

router.get('/findByPage',async(req,res)=>{
    var  page=req.query.p;
    var  title=req.query.t;
    // console.log(req.query,'====')
    const itemlist = await DB('SELECT * FROM book  WHERE bookname="' + title +'" limit '+ (page-1) +',1');

    // const itemlist = await DB('SELECT * FROM book LIMIT '+ (page-1) +',1');
    res.render('admin/bookdetail/index',{
        list: itemlist
    });
})

router.get('/findDetail',async(req,res)=>{
    var  title=req.query.t;
    
    const itemlist = await DB('SELECT * FROM book  WHERE bookname="' + title +'" limit 0,1');
    // console.log(itemlist.length,'--==')
    if(itemlist.length ==0){
        res.send("<h1>404</h1>")
        return
    } else{
        res.render('admin/bookdetail/index',{
            list: itemlist
        });
    }
})


module.exports = router;   /*暴露这个 router模块*/