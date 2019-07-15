import Vue from 'vue';
//自定义拖动
Vue.directive('drag',
    function (el, binding) {
        let oDiv = el;   //当前元素
        oDiv.style.cursor = 'pointer'
        oDiv.onmousedown = function (e) {
            e.preventDefault();
            let bw = document.body.clientWidth;
            let bh = document.body.clientHeight;
            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;
            // 计算两边坐标

            document.getElementById('imgs').onmousemove = function (e) {
                let l = 0, t = 0;
                // 拖动边界
                if (e.clientX >= bw) {
                    l = bw - disX;
                } else if (e.clientX <= 0) {
                    {
                        l = 0 - disX;
                    }
                } else {
                    l = e.clientX - disX;
                }
                if (e.clientY >= bh) {
                    t = bh - disY;
                } else if (e.clientY <= 0) {
                    t = 0 - disY;
                }
                else {
                    t = e.clientY - disY;
                }
                //移动当前元素
                oDiv.style.left = l + 'px';
                oDiv.style.top = t + 'px';
            };
            // 鼠标停止移动时，事件移除
            document.getElementById('imgs').onmouseup = function (e) {
                document.getElementById('imgs').onmousemove = null;
                document.getElementById('imgs').onmouseup = null;
            };
        };
    }
);
