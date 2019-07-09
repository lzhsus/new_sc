<template>
  <div class="ui-app with-header">
    <header id="BP_headBar" class="ui-head-bar">
		<a class="arr" href="javascript:void(history.back());">
			<i class="icon-back"></i>
		</a>
		<p class="title">登录</p>
		<span class="badge" @click="registerBtn">立即注册</span>
    </header>
    <div id="views">
      <div class="user_content">
        <!-- <div class="login_third">
			<div class="login_third_btn">
				<a href="javascript:void(0);" class="js-third-login weixin third_login"></a>
				<a href="javascript:void(0);" class="js-third-login qq third_login"></a>
				<a href="javascript:void(0);" class="js-third-login sina third_login"></a>
			</div>
        </div> -->
        <div class="login_title mgj"><span class="third_title">商城街账号登录</span> </div>
        <div class="form_wrap">
			<div class="form_mod_wrap mb15">
				<div class="form_mod">
					<div> <input type="text" v-model="name" @input="nameFunc" class="js-uname userselect text" placeholder="昵称/邮箱/手机号"> </div>
				</div>
				<div class="form_mod">
					<div> <input type="password" v-model="paw" @input="pawFunc" class="js-pwd userselect text" placeholder="密码"> </div>
				</div>
			</div>
			<div class="js-captcha-container"></div>
			<div class="login_show" @click="J_login_btn">
					<span class="login_btn" id="J_login_btn">登录</span>
			</div>
        </div>
        <p class="clearfix">
          <!-- <a href="javascript:void(0);" class="overseaslogin login_idea fl">全球手机登录</a> -->
          <a href="javascript:void(0);" class="findpwd login_idea fr">忘记密码?</a>
        </p>
        <p class="copyright">©2019 Mogujie.com 上海网络有限公司</p>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "src/services/api"
import { setTimeout } from 'timers';

  export default {
    data(){
		return {
			paw:'',
			name:''
		}
    },
    components: {

    },
    route: {
        data(transition){
                const _self = this
                _self.$route.router.app.loading = false
        },
        deactivate(transition){
                //$(window).off('scroll');
                transition.next()
        }
    },
    methods: {
		nameFunc(e){
			this.name=e.target.value
		},
		pawFunc(e){
			this.paw=e.target.value
		},
		registerBtn(){
			window.location.href=vueApp.href('register')
		},
		J_login_btn(){
			if(!this.name||!this.paw){
				vueApp.alert('请输入账号和密码！')
				return;
			}
			Api.info({
				mobile:this.name,
				password:this.paw
			}).then(res=>{
				console.log(res)
				if(res.success){
					localStorage.token=res.result.token
					localStorage.mobile=res.result.mobile
					localStorage.headportrait="http://1434253600.xyz/"+res.result.headportrait
					localStorage.userinfo=JSON.stringify(res.result.userinfo)
					vueApp.alert(res.msg).then(res=>{
						window.location.href=vueApp.href("main")
					})
				}else{
					vueApp.alert(res.msg)
				}
			})
			// 开始登陆
			// 
		}
	},
	mounted(){
		
	}
  }
</script>
<style lang="less">
.with-header{
	#views{
		 /* 登录、注册页面 css */
		.user_content {
			min-width: 320px;
			.login_third{
				padding: 1.4rem 0.6rem 0;
				.login_third_btn {
					text-align: center;
					.third_login {
						display: inline-block;
						width: 2.8rem;height: 2.8rem;
						border-radius: 50%;
						margin: 0 0.5rem;
						background: #fff url(http://www.mogujie.com/img/imgwap/loading_alpha.gif) no-repeat;
					}
					.weixin {
						background: url(http://s17.mogucdn.com/p1/150803/upload_ieztiyrzgaygcoddgizdambqgyyde_210x210.png) center no-repeat;
						background-size: 100%;
					}
					.qq {
						background: url(http://s16.mogucdn.com/p1/150803/upload_ieztmnzwmztdsoddgizdambqgyyde_210x210.png) center no-repeat;
						background-size: 100%;
					}
					.sina {
						background: url(http://s18.mogucdn.com/p1/150803/upload_ie2gcmbqgaygcoddgizdambqgiyde_210x210.png) center no-repeat;
						background-size: 100%;
					}
				}
			}
			 .login_title {
				padding: 1.2rem 0.6rem 0;
				&.mgj{
					margin-bottom: -0.54rem;
				}
				span {
					display: inline-block;
					width: 100%;
					text-align: center;
					color: #666;
					font-size: 0.4rem;
					position: relative;
					&::before,&::after {
						content: '';
						width: 2.6rem;
						border-bottom: 1px solid #d8d8d9;
						position: absolute;
						top: 0.3rem;
					}
					&::before {left: 0;}
					&::after {right: 0;}
				}
			}
		}
		.form_wrap {
			padding: 1rem 0.6rem 0.48rem;
			.form_mod_wrap{
				.form_mod {
					padding: 0.2rem 0.4rem;
					margin-bottom: 0.4rem;
					font-size: 0.44rem;
					line-height: 0.44rem;
					/* border: 1px solid #d1d1d1; */
					background: #f2f2f2;
					border-radius: 3px;
					.text {
						width: 100%;height: 0.88rem;
						line-height: 0.88rem;
						-webkit-box-flex: 1;
						display: block;
						font-size: 0.44rem;color: #444;
						border: none;
						background: #f2f2f2;
						&::-webkit-input-placeholder {
							color: #aeaeae;
						}
						&::-moz-placeholder {
							color: #aeaeae;
						}
						&::-moz-placeholder {
							color: #aeaeae;
						}
						&::-ms-input-placeholder {
							color: #050303;
						}
					}
				}
			}
			 /* 登录注册 */
			.login_show {
				.login_btn {
					width: 100%;height: 1.2rem;
					line-height: 1.2rem;text-align: center;
					font-size: 0.44rem;color: #fff;
					display: inline-block;
					background: #ff5777;
					border-radius: 10px;
				}
				.sinaqq {
					margin-bottom: 0;
				}
				.regist_btn {
					width: 100%;height: 1.2rem;
					line-height: 1.2rem;line-height: 1.8rem;
					font-size: 0.44rem;color: #ff5777;
					background: #ecedef;
				}
			}
		}
		.clearfix{
			/*全球登录*/
			.login_idea {
				width: 50%;
				font-size: 0.36rem;color: #494949;
				text-align: center;
				padding: 0 20px;
				&.overseaslogin {
					border-right: solid 1px #9f9f9f;
				}
			}
		}
		.copyright {
			font-size: 0.3rem;color: #888;
			text-align: center;
			padding: 0.36rem 0;
			border-top: 1px solid #dbdcde;
			margin-top: 1.9rem;
		}
	}
}
</style>
