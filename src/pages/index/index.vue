<template>
	<div class="hello" id="index">
		<!-- <headTop/> -->
		<div class="index-content">
			<div class="index-middle">
				<div class="miui-bar">
					<div class="address" @click="lookAddressBtn">盐城市</div>
					<div class="_input"><input type="text" v-model="ssInput"></div>
					<div class="service-kf" @click="kfBtn"></div>
				</div>
				<div class="index-banner">
					<div class="swiper-container swiper1">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in banners">
								<img :src="item.img_url" alt="" srcset="">
							</div>
						</div>
						<div class="swiper-pagination"></div>
					</div>
				</div>
				<div class="goods-kind">
					<div class="swiper-container swiper2">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<ul class="clearfix">
									<li v-for="(item,index) in kinds"  v-if="index <6" @click="kindBtn(item)">
										<img class="lazy" :src="item.img_url">
										<h4>{{item.name}}</h4>
									</li>
								</ul>
							</div>
							<div class="swiper-slide">
								<ul class="clearfix">
									<li v-for="(item,index) in kinds" v-if="index >=6" @click="kindBtn(item)">
										<img class="lazy" :src="item.img_url">
										<h4>{{item.name}}</h4>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="ad-content">
					<img src="/static/images/index/ad-item-1.png" alt="" srcset="">
				</div>
				<div class="hot-goods">
					<div class="f-left" @click="hotGoodBtn(1)"><img src="/static/images/index/2018092816300922919.png" alt="" srcset=""></div>
					<div class="f-right">
						<div class="c-top" @click="hotGoodBtn(2)"><img src="/static/images/index/2018110315472730631.png" alt="" srcset=""></div>
						<div class="c-bottom">
							<div @click="hotGoodBtn(3)"><img src="/static/images/index/2018110315473716807.png" alt="" srcset=""></div>
							<div @click="hotGoodBtn(4)"><img src="/static/images/index/2018092816295223470.png" alt="" srcset=""></div>
						</div>
					</div>
				</div>
				<div class="ad-content">
					<img src="/static/images/index/ad-item-2.png" alt="" srcset="">
				</div>
			</div>
			<tabbar :seleid="seleid"></tabbar>
		</div>
		<mt-popup v-model="popupVisible" position="bottom">
			<mt-picker :slots="slots" @change="onValuesChange" :showToolbar="true">
				<div class="mt-cancel" @click="cancelBtn">取消</div>
				<div class="mt-confirm" @click="confirmBtn">确定</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import Vue from 'vue';
import Api from "src/services/api"
import { Popup ,Picker } from 'mint-ui';
import indexJSON from 'static/jsop/index.json'

require("assets/css/swiper.min.css");
import headTop from "components/headTop";
import Swiper from "static/js/swiper.min.js";
import tabbar from "components/tabbar";
import { setTimeout } from 'timers';
export default {
	data() {
		return {
			seleid:1,
			banners:[],
			kinds:[],
			tabbar: true,
			ssInput:'摄像机',
			popupVisible:false,
			slots:[
				{
				flex: 1,
					values: ['上海市'],
					className: 'slot1',
					textAlign: 'center'
				}
			]
		};
	},
	components: {
		headTop,
		tabbar,
		"mt-popup":Popup,
		'mt-picker':Picker
	},
	methods: {
		kfBtn(){
			window.location.href=vueApp.config.kf
		},
		onValuesChange(picker, values) {
			if (values[0] > values[1]) {
				picker.setSlotValue(1, values[0]);
			}
		},
		lookAddressBtn(){
			this.popupVisible=true
		},
		cancelBtn(){
			this.popupVisible=false
		},
		confirmBtn(){
			this.popupVisible=false
		},
		kindBtn(item){
			
			window.location.href=vueApp.href('kinds')+'?sign='+item.sign+'&name='+encodeURI(encodeURI(item.name))
		},
		hotGoodBtn(item){
			window.location.href=vueApp.href('detail')+'?sign='+item.sign
		},
		loginFunc(){
			Api.login().then(res=>{
				this.kinds=res.result
			})
		},
		bannerFunc(cb){
			Api.banner().then(res=>{
				this.banners=res.result
				cb()
			})
		},
	},
	mounted() {
		this.loginFunc()
		this.bannerFunc(res=>{
			this.$nextTick(data=>{
				var swiper1=new Swiper(".swiper1", {
					pagination: {
						el: '.swiper-pagination',
					}
				});
				var swiper2=new Swiper(".swiper2", {});
			})
		})
	}
};
</script>
<style lang="less" scoped>
body{
	
}
	.mint-popup{
		width: 100%;
	}
	.picker{
		.mt-cancel{
			width: 100px;height: 100%;line-height: 40Px;
			font-size: 14Px;color: blue;
			float: left;margin-left: 100px;
		}
		.mt-confirm{
			width: 100px;height: 100%;line-height: 40Px;
			font-size: 14Px;color: blue;
			float: right;margin-right: 100px;
		}
	}
#index {
	width: 100%;
	height: 100%;
background: #f8f8f8; 
	display: flex;
	flex-direction: column;
	.index-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-bottom: 100px;
		overflow-y: scroll;
		.index-middle {
			width: 100%;
			.miui-bar{
				width: 100%;height: 50Px;line-height: 50Px;
				display: flex;justify-content: space-between;align-items: center;
				.address{
					padding: 0 20px;box-sizing: border-box;
					width: 220px;
					position: relative;
					&::before{
						position: absolute;left: 10px;top: 50%;
						transform: translateY(-50%);
						display: table;content: '';
						width: 24Px;height:24Px ;
						background: url('/static/images/index/address-icon.png') center center no-repeat;
						background-size: cover;
					}
					&::after{
						position: absolute;right: 30px;top: 50%;
						border-right: 1Px solid #bfbfbf;
						border-top: 1Px solid #bfbfbf;
						transform:translateY(-50%) rotate(45deg);
						display: table;content: '';
						width: 7Px;height:7Px ;
					}
				}
				._input{
					width: 400px;position: relative;
					input{
						display: block;
						width: 100%;height: 34Px;
						padding: 0 80px 0 30px; box-sizing: border-box;
						border:1px solid #f3e9e9;
						background: rgba(214, 204, 204, 0.1);
						border-radius: 20Px;
						color: #a7a2a2;
					}
					&::after{
						position: absolute;right: 20px;top: 50%;
						transform: translateY(-50%);
						display: table;content: '';
						width: 24Px;height:24Px ;
						background: url('/static/images/index/ss-icon.png') center center no-repeat;
						background-size: cover;
					}
				}
				.service-kf{
					margin-right: 20px;
					width: 150px;height: 100%;
					background: url('/static/images/index/server-kf-icon.png') right center no-repeat;
					background-size: 30Px 30Px;
				}
			}
			.index-banner {
				.swiper-container {
					width: 100%;
					.swiper-slide {
						display: flex;
						justify-content: center;
						align-items: center;
					}
					img {
						display: block;
						width: 100%;
					}
				}
			}
			.goods-kind {
				background: #fff;
				width: 710px;
				margin:20px auto;
				border-radius: 20px;
				.swiper-container {
					width: 100%;
					.swiper-slide {
						display: flex;
						justify-content: center;
						align-items: center;
						.clearfix {
							display: flex;justify-content: flex-start;align-content: center;
							flex-wrap: wrap;
							li {
								width: 196px;
								padding:12px 20px;
								img{
									width: 90px;height: 90px;
								}
								h4{
									font-siz0e: 12Px;
								}
							}
						}
					}
				}
				
			}
			.ad-content{
				margin:20px auto;
				img{
					width: 100%;
				}
			}
			.hot-goods{
				background: #f8f8f8;
				display: flex;justify-content: space-between;align-items: center;
				.f-left{
					width: 340px;
					background: #fff;
					// padding-right: 50px;
					// border-right: 12px solid #f8f8f8;
					img{
						width: 240px;
					}
				}
				.f-right{
					width: 400px;
					display: flex;
					flex-direction: column;justify-content: center;
					.c-top{
						img{
							width: 100%;
						}
						margin-bottom: 8px;
					}
					.c-bottom{
						display: flex;justify-content: space-between;align-items: center;
						div{
							width: 196px;
							img{
								width: 100%;
							}
						}
					}
				}
			}
		}
	}
}
</style>


