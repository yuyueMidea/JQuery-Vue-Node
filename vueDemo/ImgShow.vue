<!--
 * @Author: your name
 * @Date: 2019-11-02 14:45:08
 * @LastEditTime: 2019-11-02 14:52:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vueCounter\src\components\imgShow.vue
 -->
<template>
    <div>
        <el-button type="info" @click="getimg">添加图片</el-button>
        <br/><hr/>
		<div class="the_img_list" style="border:1px solid #ccc" />

    </div>
</template>
<script>
import Jimp from 'jimp';
import img1 from '../assets/public.png'

export default {
    name:'imgShow',
    data(){
        return{

        }
    },
    methods:{
            getimg(){
				Jimp.read(img1, (err, lenna) => {
				if (err) throw err;
				// console.log('tag--->', lenna)
				lenna
				.resize(256, Jimp.AUTO)      // resize
					.quality(100)                 // set JPEG quality
					// .mirror(true, false)
					// .rotate(-12)
					// .greyscale()                 // set greyscale
					.getBase64(Jimp.AUTO,  (err, src)=> {
						var img = document.createElement("img");
						img.setAttribute("src", src);
						document.querySelector('.the_img_list').appendChild(img);
						// this.imgSrc =src
					});
				});
			},
    }
}
</script>