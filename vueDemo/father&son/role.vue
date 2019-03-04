<template>

    <div>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
        <el-row>
            <Child :sunny="list" :addnum="num1"></Child>
        </el-row>
        <el-row>
            <el-button type="primary" icon="el-icon-search"  ></el-button>
            <el-button type="success" icon="el-icon-plus" circle ></el-button>
            <el-button type="warning" icon="el-icon-edit" circle ></el-button>
            <i class="el-icon-edit"></i>
            <i class="el-icon-share"></i>
            <i class="el-icon-delete"></i>
            <i class="el-icon-success"></i>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>

            <ButtonCount></ButtonCount>
        </el-row>
        <el-row class="newRow"  >
            <el-col :span="12">
                <p>this is el-col-1</p>
            </el-col>
            <el-col :span="12">
                <h3>this is col-2</h3>
            </el-col>
        </el-row>
        <el-row class="newRow" >
            <el-col :span="6"><p>111</p></el-col>
            <el-col :span="6"><p>222</p></el-col>
            <el-col :span="6"><p>333</p></el-col>
            <el-col :span="6"><p>444</p></el-col>
        </el-row>
      <hr>
        <el-container>
            <el-aside>aside</el-aside>
            <el-container>
                <el-header>header</el-header>
                <el-main>main</el-main>
                <el-footer>footer</el-footer>
            </el-container>
        </el-container>
        <hr>
        <el-container>
            <el-header>header1111111111</el-header>
            <el-container>
                <el-aside>aside11111</el-aside>
                <el-main>main111111</el-main>
            </el-container>
            <el-footer>footer111111111</el-footer>
        </el-container>
        
    </div>
</template>

<script>

import  ButtonCount  from './button-counter'
import  Child  from './child'
export default{
    name:'role',
    components:{
        ButtonCount,
        Child
    },
    data(){
        return{
            isActive: false,
            num1: 5,
            list:[
                {
                    name:'zhangsan',
                    age:33
                },
                {
                    name:'lisi',
                    age:44
                },
                {
                    name:'wangwu',
                    age:55
                }
            ]
        }
    },
    methods:{
        handleChange(value) {
            console.log(value);
            // debugger
        }
    },
     watch:{
        num1:function(indexVal, oldVal){
            console.log(indexVal, oldVal);
            debugger
        }
    }
}
</script>
<style>

.newRow .el-col{
    border:1px solid #ccc; border-radius: 4px; text-align: center;
}
.newRow .el-col:nth-child(2n){
    background: #d3dce6;
}
.newRow .el-col:nth-child(2n+1){
    background: #e5e9f2;
}

 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>

