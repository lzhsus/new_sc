
<template>
	<div class="ui-app with-header" id="register">
		<header id="BP_headBar" class="ui-head-bar">
			<a class="arr" href="javascript:void(history.back());">
				<i class="icon-back"></i>
			</a>
			<p class="title">注册</p>
			<span class="badge" @click="loginBtn">已有账号</span>
		</header>
		<div id="views">
			<div id="user-register" class="user-content">
				<div class="form-wrap">
					<div class="form-group">
						<div class="area-text">国家与地区</div>
						<input type="text" class="input area-value js-area-code" value="中国" readonly="true">
					</div>
					<div class="form-group">
						<input type="tel" v-model="mobile" @input="mobileFunc" class="input phone-number js-phone-number" placeholder="手机号"> 
					</div>
					<div class="form-group">
						<input type="text" class="js-msg-validate input msg-validate" @input="verificationFunc" placeholder="请输入短信验证码" v-model="verification">
						<div v-if="getCodeShow" class="js-msg-btn msg-btn" @click="getCode">获取验证码</div>
						<div v-else class="js-left-container left-time hide">
							<span class="js-left-time"></span>{{num}}秒后重发
						</div>
					</div>
					<div class="form-group">
						<input type="password" v-model="password" @input="passwordFunc" class="input phone-number js-phone-number" placeholder="密码"> 
					</div>
					<div class="form-group">
						<input type="password" v-model="password2" @blur="padBlurFunc" @input="password2Func" class="input phone-number js-phone-number" placeholder="确认密码"> 
					</div>
					<div class="js-regist-btn confirm-btn" @click="confirmBtn">立即注册</div>
					<a class="tip" href="/service">* 注册代表同意《网络服务使用协议》</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  let degindex = 0
  export default {
    data(){
		return {
			mobile:'',
			password:'',
			password2:"",
			verification:'',
			num:60,
			getCodeShow:true
		}
    },
    components: {

    },
    methods: {
		loginBtn(){
            window.location.href=vueApp.href('login')
		},
		mobileFunc(e){
			this.mobile=e.target.value
		},
		passwordFunc(e){
			this.password=e.target.value
		},
		password2Func(e){
			if(!this.password){
				vueApp.alert("请先输入密码！");
				return;
			}
			this.password2=e.target.value
		},
		padBlurFunc(e){
			if(e.target.value!=this.password){
				vueApp.alert("输入密码不一致，请重新输入！")
				this.password2="";
			}
		},
		verificationFunc(e){
			this.verification=e.target.value
		},
		confirmBtn(){
			if(!(/^1\d{10}$/).test(this.mobile)){
                vueApp.alert('请输入正确的电话号码!')
                return;
            }
			if(!this.verification){
 				vueApp.alert('请输入验证码!')
                return;
			}
			if(!(/^[a-zA-Z0-9]{4,10}$/).test(this.password)){
                vueApp.alert('请输入密码!')
                return;
			}
			if(!(/^[a-zA-Z0-9]{4,10}$/).test(this.password2)){
                vueApp.alert('请确认密码!')
                return;
			}
			var data={
				mobile:this.mobile,
				password:this.password,
				yzcode:this.verification,
				country:"中国"
			}
			$.ajax({
				url:"http://1434253600.xyz/api/register",
				type:"post",
				data:JSON.stringify(data),
				cache: false,
				contentType: false,
				processData: false,
				success:res=>{
					console.log(res)
					if(res.success){
						vueApp.alert(res.msg)
					}else{
						vueApp.alert(res.msg)
					}
				}
			})
		},
		//获取验证码
		getCode(){
			if(!(/^1\d{10}$/).test(this.mobile)){
                vueApp.alert('请输入正确的电话号码!')
                return;
			}
			this.djsFunc()
		},
		djsFunc(){
			var num=this.num
			setInterval(res=>{
				if(!num){
					this.getCodeShow=true
					return
				}
				this.getCodeShow=false
				num--
				this.num=num
			},1000)
		}
	},
	mounted(){
		
	}
  }
</script>

<style lang="less">
#register{
	#views{
		#user-register{
			&.user-content {
				min-width: 320px;
			}
			.form-wrap {
				padding: 0 0.3rem;
				.form-group {
					height: 1.36rem;
					line-height: 1.36rem;
					padding: 0 0.6rem;
					border-bottom: 1px solid #d8d8d9;
					background: #fff;
					position: relative;
					display: -webkit-box;
					margin-top: 20px;
					box-sizing: border-box;overflow: hidden;
					.area-text {
						height: 1.2rem;
						position: absolute;
						font-size: 0.4rem;
						color: #999;
					}
					.input {
						-webkit-box-flex: 1;
						border: none;
						font-size: 0.4rem;
						color: #444;
						height: 1rem;
						line-height: 1rem;
						box-sizing: border-box;overflow: hidden;
						border-radius: 0;
						&.area-value {
							position: absolute;
							top: 0;
							right: .6rem;
							text-align: right;
							color: #333;
						}
						&.areacode {
							width: 1rem;
							border-right: 1px solid  #d8d8d9;
						}
						&.phone-number {
							width: 5.5rem;
							// margin-left: 0.4rem;
						}
					}
					.area-arrow {
						position: absolute;top: 0;right: 0;
						width: .6rem;height: 100%;
						background: url('http://s16.mogucdn.com/p1/151222/upload_ie4gmmzxge2gkzrzguzdambqgiyde_17x29.png') 100% 50 no-repeat;
						background-size: 50%;
					}
					.plus {
						font-size: 12px;
						margin-right: 0.1rem;
						height: 1.36rem;
						line-height: 1.3rem;
						color: #999;
					}
				}
			}
			.js-captcha-container{
				.form_check {
					.check_notice {
						margin: 0.4rem auto;
						font-size: 0.4rem;
						position: relative;
						a {
							position: absolute;
							right: 0;
							color: #ee4566;
						}
						span {
							color: #333333;
						}
					}
					.check_img {
						margin-left: -0.22rem;
						-webkit-user-select: none;
						.img_div {
							float: left;
							width: 2.12rem;height: 2.12rem;
							margin-left: 0.22rem;
							background-color: #fff;
							&.transition {
								-webkit-transition: all 0.5s ease-in-out;
							}
							span {
								background-repeat: no-repeat;
								display: block;
								width: 2rem;
								height: 2rem;
								margin: 0.06rem;
								background-size: 12rem auto;
								&.f0 {
									background-position: 0 0;
								}
								&.f1 {
									background-position: -3rem 0;
								}
								&.f2 {
									background-position: -6rem 0;
								}
								&.f3 {
									background-position: -9rem 0;
								}
							}
						}
					}
				}
			}
			.confirm-btn {
				display: block;
				width: 100%;height: 1.2rem;
				text-align: center;line-height: 1.2rem;
				font-size: 0.44rem;color: #fff;
				background: #FF5777;
				margin-top: 0.6rem;
				border-radius: 3px;
				border: none;
			}
		}
	}
}
  
 
  
  .tip {
    display: block;
    color: #666;
    font-size: 0.36rem;
    margin-top: 0.36rem;
  }
  .msg-validate {
    text-align: left;
    width: 5.7rem;
    border-right: .01rem solid  #d8d8d9;
  }
  .msg-btn, .left-time {
    position: absolute;
    right: 0.3rem;
    top: .06rem;
    height: 1.22rem;
    text-align: center;
    font-size: 0.4rem;
    line-height: 1.22rem;
    background: #fff;
    width: 2.2rem;
  }
</style>