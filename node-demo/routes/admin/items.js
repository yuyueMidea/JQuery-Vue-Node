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
    const itemlist = await DB('SELECT * FROM item LIMIT 0,10');
    // 渲染首页模板并把movies数据传过去
    
    res.render('admin/items/index',{
        list: itemlist
    });
})
router.post('/find',async(req,res)=>{
    var form = new multiparty.Form();
    form.parse(req, async(err, fields, files)=> {
        let queryStr = "SELECT c.* FROM item c WHERE c.title LIKE '%"+ fields.Name +"%' LIMIT 0,10";
        const itemlist = await DB(queryStr);
        res.render('admin/items/index',{
            list: itemlist
        });
    });
})

router.get('/findByPage',async(req,res)=>{
    var  page=req.query.p;
    const itemlist = await DB('SELECT * FROM item LIMIT '+ (page-1) *10 +',10');
    // 渲染首页模板并把movies数据传过去
    res.render('admin/items/index',{
        list: itemlist
    });
})

router.get('/delete',async(req,res)=>{
    var  id=req.query.id;
    const dele = await DB('DELETE c FROM item c WHERE c.ID='+id);
    res.redirect('/admin/items');
})
router.get('/add',async(req,res)=>{
    res.render('admin/items/add');
})

router.post('/doAdd',async(req,res)=>{
    var form = new multiparty.Form();
    form.parse(req, async(err, fields, files)=> {
        let sqlStr = "INSERT INTO item (title,price,description,imgUrl) VALUES ("+ '"' +String(fields.Name[0])+ '","' +String(fields.CountryCode[0])+ '","' +String(fields.District[0])+ '",' +fields.Population[0]+")";
        const addOne = await DB(sqlStr);
        res.redirect('/admin/items');
    });

})

router.get('/edit',async(req,res)=>{
    var id=req.query.id;
    const getOne = await DB('SELECT c.* FROM item c WHERE c.ID='+id);
    // console.log(getOne[0].ID);
    res.render('admin/items/edit',{
        list: getOne[0]
    });
})
router.post('/doEdit',async(req,res)=>{
    var form = new multiparty.Form();
    form.parse(req, async(err, fields, files)=> {
        let sqlStr = "UPDATE item c SET c.title="+'"'+ fields.Name[0] +'"'+",c.price="+'"'+ fields.CountryCode[0] +'"'+",c.description="+'"'+ fields.District[0] +'"'+",c.imgUrl="+ fields.Population[0] +" WHERE c.ID="+fields.ID[0];
        console.log(sqlStr)
        const updateOne = await DB(sqlStr);
        res.redirect('/admin/items');
    });
})



module.exports = router;   /*暴露这个 router模块*/