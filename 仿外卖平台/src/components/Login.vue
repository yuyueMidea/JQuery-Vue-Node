<template>
<div class="loginContainer">
<div class="loginInner">
    <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title"><a href="javascript:;" class="on">短信登录</a><a href="javascript:;">密码登录</a></div>
    </div>
    <div class="login_content">
        <form>
            <div class="on">
                <section class="login_message">
                    <input type="tel" maxlength="11" placeholder=" 手机号">
                    <button disabled="disabled" class="get_verification" >获取验证码</button>
                </section>
                <section class="login_verification"><input type="tel" maxlength="8" placeholder=" 验证码"></section>
                <section class="login_hint">温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意<a href="javascript:;">《用户服务协议》</a></section>
            </div>
            <div>
                <section>
                    <section class="login_message"><input type="tel" maxlength="11" placeholder=" 手机/ 邮箱/ 用户名"></section>
                    <section class="login_verification">
                        <input type="tel" maxlength="8" placeholder=" 密码">
                        <div class="switch_button off">
                            <div class="switch_circle"></div>
                            <span class="switch_text">...</span>
                        </div>
                    </section>
                    <section class="login_message">
                        <input type="text" maxlength="11" placeholder=" 验证码">
                        <!-- <img class="get_verification" src="./images/captcha.svg" alt="captcha"> -->
                    </section>
                </section>
            </div>
            <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
    </div>
    <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
    </span>
</div>
</div>    
</template>
<script>
export default {
    name:'login',
    data(){
        return{

        }
    }
}
</script>
<style scoped>
.loginContainer {
    width: 100%; height: 100%; background: #fff;
}
.loginContainer .loginInner {
    padding-top: 60px; width: 80%; margin: 0 auto;
}
.loginContainer .loginInner .login_header .login_logo {
    font-size: 40px; font-weight: bold; color: #02a774; text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title {
    padding-top: 40px; text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title>a {
    color: #333; font-size: 14px; padding-bottom: 4px;
}
.loginContainer .loginInner .login_header .login_header_title>a:first-child {
    margin-right: 40px;
}
.loginContainer .loginInner .login_header .login_header_title>a.on {
    font-weight: 700;color: #02a774; border-bottom: 2px solid #02a774;
}
.loginContainer .loginInner .login_content>form>div {
    display: none;
}
.loginContainer .loginInner .login_content>form>div.on {
    display: block;
}
.loginContainer .loginInner .login_content>form>div input {
    width: 100%; height: 100%; padding-left: 10px; box-sizing: border-box;
    border: 1px solid #ddd; border-radius: 4px; outline: 0; font: 400 14px Arial;
}
.loginContainer .loginInner .login_content>form>div input:focus {
    border: 1px solid #02a774;
}
.loginContainer .loginInner .login_content>form>div .login_message {
    position: relative; margin-top: 16px;height: 48px;font-size: 14px; background: #fff;
}
.get_verification {

}
</style>