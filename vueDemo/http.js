/*
 * @Author: your name
 * @Date: 2019-11-09 19:49:10
 * @LastEditTime: 2019-11-09 20:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\util\http.js
 */
import axios from 'axios'

export function fetch(url,param={}){
    return new Promise((resolve,reject)=>{
        axios.get(url, {params:param})
        .then(resData=>{
            resolve(resData.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function post(url,param={}){
    return new Promise((resolve,reject)=>{
        axios.post(url, param).then(resData=>{
            resolve(resData.data)
        }).catch(err=>{
            reject(err)
        })
    })
}