<template>
    <div class="detail" id="detail">
        <div class="detail-content">
            <div class="gather-title">
                <div @click="backBtn"><img src="/static/images/gather/back-icon.png" alt="" srcset=""></div>
                <div>{{name}}</div>
                <div @click="changeTypeChunkBtn">
                    <img src="/static/images/detail/more-item-3.png" alt="" srcset="">
                    <div class="go-page" v-if="typeChunk">
                        <ul>
                            <li @click="goPage('index')">首页</li>
                            <li @click="goPage('main')">我的</li>
                            <li @click="goPage('shopping')">租物车</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="detail-maddle">
                <div class="swiper-container">
					<div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in banners">
                            <img :src="item.img_url" alt="" srcset="">
                        </div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
                <div class="detail-msg">
                    <div class="price">
                        <div>{{price}}</div>
                        <div>租赁次数：233</div>
                    </div>
                    <div class="disCounts">{{disCounts}}</div>
                </div>
                <div class="lease-time" @click="leaseTimeBtn">租赁时间</div>
                <div class="particulars">
                    <div class="particulars-title">详情</div>
                    <img v-for="item in particulars" :src="item.img_url" alt="" srcset="">
                </div>
            </div>
            <div class="details-zu">
                <div class="kf" @click="keBtn">客服</div>
                <div class="at-once">立即租</div>
                <div class="shopping-cart">加入购物车</div>
            </div>
        </div>
        <div class="pop-box" v-if="leaseTime">
            <div class="pop-box-content">
                <div class="pop-title">租赁时间</div>
                <div class="pop-time" @click="claimBtn(1)">
                    <span>取货：</span>
                    <input type="text" v-model="selectedValue" disabled>
                </div>
                <div class="pop-time" @click="claimBtn(2)">
                    <span>归还：</span>
                    <input type="text" v-model="selectedValue1" disabled>
                </div>
                <div class="pop-time">
                    <span>总计时间：</span>
                    <input type="text" v-model="day" disabled>
                </div>
                <div class="qd" >
                    确定
                </div>
                <div class="close-btn" @click="closeBtn">X</div>
            </div>
        </div>
             <!-- 年月日时分选择 -->
        <mt-datetime-picker
            lockScroll="true"
            ref="datePicker"
            v-model="dateVal"
            class="myPicker"
            type="datetime"
            year-format="{value}"
            month-format="{value}"
            date-format="{value}"
            hour-format="{value}"
            minute-format="{value}"
            second-format="{value}"
            @confirm="dateConfirm()">
        </mt-datetime-picker>
    </div>
</template>

<script>
import Vue from 'vue';
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);

require("assets/css/swiper.min.css");
import geturlParmes from "static/js/geturlParmes"
import detaillist from "static/jsop/detaillist.json"
import Swiper from "static/js/swiper.min.js";
import {dayData} from "static/js/dayData.js"
import {formatDate} from 'static/js/fromData.js'
export default {
    data(){
        return{
            popId:1,
            popupVisible:false,
            day:'',
            dateVal: '', // 默认是当前日期
            time:'',
            selectedValue: '',
            selectedValue1:'',
            id:'',
            value:[],
            typeChunk:false,
            leaseTime:false,
            banners:[],
            particulars:[],
            disCounts:'',
            rentalNum:'',
            price:'',
            name:''
        }
    },
    methods:{
        claimBtn(id){
            this.popId=id;
            // 1取货 2回环
            if(id==1){
                if (this.selectedValue) {
                    this.dateVal = this.selectedValue
                } else {
                    this.dateVal = new Date()
                }
            }else{
                if (this.selectedValue1) {
                    this.dateVal = this.selectedValue1
                } else {
                    this.dateVal = new Date()
                }
            }
            this.$refs['datePicker'].open()
        },
        dateConfirm(){
            if(this.popId==1){
                this.selectedValue = formatDate(this.dateVal,'yyyy-MM-DD hh:mm:ss')
                this.time=Math.round(this.dateVal)
            }else{
                if(!this.selectedValue){
                    vueApp.alert('请先选择取货时间！')
                    return;
                }
                if(Math.round(this.dateVal)<this.time){
                    vueApp.alert('归还时间请大于取货时间！')
                    return;
                }
                this.day=dayData(Math.round(this.dateVal)-this.time).time
                this.selectedValue1 = formatDate(this.dateVal,'yyyy-MM-DD hh:mm:ss')
                
            }
        },
        keBtn(){
            window.location.href=vueApp.config.kf
        },
        closeBtn(){
            this.leaseTime=false;
        },
        leaseTimeBtn(){
            this.leaseTime=true;
        },
        changeTypeChunkBtn(){
            this.typeChunk=!this.typeChunk
        },
        backBtn(){
            window.history.back()
        },
        goPage(page){
            window.location.href=vueApp.href(page)
        }
    },
    mounted(){
        let that = this
         this.$nextTick(function () {
            new Swiper(".swiper-container", {
                autoplay: true,//可选选项，自动滑动
                pagination: {
                    el: '.swiper-pagination',
                },
                observer:true
            });
        })
        
        vueApp.tabbar.show=false;
        this.id=geturlParmes('backId')
        var id=geturlParmes("id");
        
        if(!id) id=111 //防止 id 为空
        
        detaillist.forEach(element => {
            // if(element.id==id){
                this.banners=element.files
                this.particulars=element.particulars
                this.disCounts=element.dis_counts;
                this.rentalNum=element.rental_num;
                this.price=element.price
                this.name=element.name
            // }
        });

        
    }
}
</script>

<style lang="less" >
.myPicker{
    position: absolute;z-index: 99999;
    width: 100%;display: block;
    background: #ffffff;
}
#detail{
        height: 100%;
    .pop-box{
        position: fixed;top: 0;left: 0;z-index: 999;
        overflow: hidden;
        width: 100%;height: 100%;
        background: rgba(90, 87, 87, 0.8);
        .pop-box-content{
            position: relative;top: 50%;left: 50%;z-index: 9999;
            transform: translate(-50%,-50%);
            border-radius: 4px;
            width: 600px;height: 800px;
            background: #ffffff;
            .pop-title{
                width: 100%;padding: 20px;box-sizing: border-box;
                font-size: 40px;text-align: center;color: #ee5656;
            }
            .pop-time{
                padding: 20px 0;
                box-sizing: border-box;
                span{

                }
            }
            .close-btn{
                width: 50px;height: 50px;
                text-align: center;line-height: 50px;
                position: absolute;top: 0;right: 0;
            }
        }
    }
    .detail-content{
        height: 100%;
        flex: 1;display: flex;
        flex-direction: column;justify-content: center;
        .gather-title{
            width: 100%;height: 50Px;line-height: 50Px;
            font-size: 30px;color: #000;
            padding: 0 20px;box-sizing: border-box;
            margin-bottom: 10px;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 2px 10px rgba(214, 207, 207, 0.8);
            display: flex;justify-content:space-between;align-items: center;
            div:nth-of-type(2){
                overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
            }
            div:nth-of-type(3){
                position: relative;
                .go-page{
                    position: absolute;right: -6px;top: 50Px;z-index: 99;
                    width: 120px;height: 220px;
                    border-radius: 4px;
                    background: rgba(0, 0, 0, 0.6);
                    ul{
                        li{
                            width: 100%;height: 50px;
                            color: #ffffff;
                            font-weight: normal;
                            font-size: 14Px;
                        }
                    }
                }
            }
            img{
                width: 40Px;
            }
        }
        .detail-maddle{
            width: 100%;height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            .swiper-container{
                width: 100%;
                img{
                    width: 100%;
                }
            }
            .detail-msg{
                width: 100%;
                background: #ffffff;
                padding:20px;
                box-sizing: border-box;
                .price{
                    padding-bottom: 20px;
                    display: flex;justify-content: space-between;align-items: center;
                    div:nth-of-type(1){
                        font-size: 30px;color: #ee5656;
                    }
                    div:nth-of-type(2){
                        font-size: 24px;color: #999;
                    }
                }
                .disCounts{
                    padding-top: 20px;
                    text-align: left;
                    border-top: 1px solid #f5f5f5;
                    font-size: 22px;color: inherit;
                }
            }
            .lease-time{
                margin: 20px 0;
                width: 100%;
                background: #ffffff;
                padding: 20px;box-sizing: border-box;
                text-align: left;
                font-size: 30px;
                position: relative;
                &::after{
                    position: absolute;right: 40px;top: 50%;
                    transform: rotate(45deg) translateY(-50%);
                    display: table;content: '';
                    width: 10Px;height: 10Px;
                    border-top: 1px solid #afabab;
                    border-right: 1px solid #afabab;
                }
            }
            .particulars{
                width: 100%;
                margin: 20px 0 0 0;
                background: #ffffff;
                .particulars-title{
                    font-size: 20Px;
                    color: #ee5656;
                    border-bottom: 5px solid #ee5656; 
                }
                img{
                    width: 100%;display: block;
                }
            }
        }
        .details-zu{
            width: 100%;height: 50Px;
            background: rgb(255, 255, 255);
            display: flex;justify-content:flex-end;align-items: center;
            box-shadow: -2px -2px 6px rgba(90, 87, 87, 0.8);
            .kf{
                width: 200px;height: 50Px;line-height: 30Px;
                text-align: center;
                padding-top: 20Px;box-sizing: border-box;
                font-size: 22px;
                position: relative;
                &::after{
                    position:absolute;top:12px;left: 50%;
                    transform: translateX(-50%);
                    display: table;content: '';
                    width: 20Px;height: 20Px;
                    background: url(/static/images/index/server-kf-icon.png) center center no-repeat;
                    background-size: cover;
                }
            }
            .at-once{
                width: 300px;height: 50Px;line-height: 50Px;
                text-align: center;
                font-size: 30px;color: #ffffff;
                background: #ee5656;
            }
            .shopping-cart{
                width: 250px;height: 50Px;line-height: 50Px;
                text-align: center;
                font-size: 20px;color: #ffffff;
                background: #fd9d73;
            }
        }
    }
}
</style>

