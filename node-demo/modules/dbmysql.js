/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 14:49:18
 * @LastEditTime: 2019-08-22 16:37:20
 * @LastEditors: Please set LastEditors
 */
// db.js

const mysql = require('mysql');
const bluebird = require('bluebird');

// 创建连接
const connection = mysql.createConnection({
    host: 'localhost',      // host
    port: 3306,             // 端口号默认3306
    database: 'world',   // 对应的数据库
    user: 'root',
    password: '920811'
});

connection.connect();  // 连接数据库

// bluebird是为了方便支持promise语法化
// 然后直接把数据库的query查询语句导出方便之后调用
module.exports = bluebird.promisify(connection.query).bind(connection);
