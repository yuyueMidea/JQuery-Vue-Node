<!--
 * @Author: your name
 * @Date: 2019-10-29 21:20:49
 * @LastEditTime: 2019-10-30 09:31:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\components\Menu.vue
 -->
<template>
    <div class="the_menu1">
            <p>这是菜单页面</p>
            <br/><hr/>

            <el-menu :unique-opened = "true" default-active="2" class="el-menu-vertical-demo" 
              @open="handleOpen"  @close="handleClose"
              background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <!-- 一级菜单 -->
                <el-submenu v-for="route in menus" :key="route.menuId" :index="String(route.menuId)">
                    <template slot="title">
                        <i class="el-icon-arrow-right "></i>
                        <span>{{route.localName_zh}}</span>
                    </template>
                    <!-- 二级菜单 -->
                    <el-menu-item-group v-if="route.subMenus && route.subMenus.length>0">
                        <el-menu-item v-for="route2 in route.subMenus" :key="route2.menuId"
                            :index="String(route2.menuId)">
                                <template slot="title">
                                    <i class="el-icon-arrow-right smallIcon" v-if="route2.subMenus && route2.subMenus.length>0"></i>
                                    <span>{{route2.localName_zh}}</span>
                                </template>
                            </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
    </div>
</template>
<script>
import * as m1 from '../menu.json'
console.log('tag--m1---', m1)

export default {
    name:'menu1',
    data(){
        return{
            menus: m1
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        debugger
      },
    }
}
</script>
<style scoped>

.the_menu1 .el-menu-vertical-demo{
    width: 240px;
    min-height: 400px;
    height: 560px;
    overflow: hidden;
    overflow-y: auto;
}
.the_menu1 .el-menu-vertical-demo .smallIcon{
    font-size: 14px;
}
</style>