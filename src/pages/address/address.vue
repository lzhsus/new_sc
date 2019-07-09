<template>
    <div id="address">
        <div class="gather-title">
            <div @click="backBtn"><img src="/static/images/gather/back-icon.png" alt="" srcset=""></div>
            <div>填写收货地址</div>
            <div>
                <!-- <img v-if="typeChunk" src="/static/images/gather/gather-more-1.png" alt="" srcset=""> -->
                <!-- <img v-else src="/static/images/gather/gather-more-2.png" alt="" srcset=""> -->
            </div>
        </div>
        <div class="container-content" >
            <!-- 添加新的收货地址弹层 -->
            <div class="add-address-input">
                <div class="add-address-type">
                    <div class="input-type">收货人</div>
                    <!-- <input  value="{{name}}" bindinput='forName' class="_input" type="text" placeholder-class='placeholder-class' placeholder="您的名字" /> -->
                </div>
            </div>
            <div class="add-address-input">
                <div class="add-address-type">
                    <div class="input-type">联系电话</div>
                    <!-- <input value='{{mobile}}' bindinput='forMobile' class="_input" type="number" placeholder-class='placeholder-class' placeholder="收件人手机号码" /> -->
                </div>
            </div>
            <div class="add-address-input">
                <div class="add-address-type">
                    <img class="goto-icon1" src='https://190122fg0365qh.eintone.com/weapp/static/qiaohushop/goto-icon1.png' mode='widthFix' />
                    <div class="input-type">所在城市</div>
                    <!-- <input class="_input" type="text" value="{{cityinp}}" placeholder-class='placeholder-class' placeholder="所在城市" /> -->
                    <!-- <picker class="city-inp"  mode='region' bindchange='citybindchange'>
                        <div class="picker-span"></div>
                    </picker> -->
                </div>
            </div>
            <div class="detailed-address">
                <div class="detailed-box">
                    <div class="input-type">详细地址</div>
                    <!-- <textarea value='{{detailedAddress}}' bindinput='forDetailedAddress' class="detailed-inp" maxlength='{{maxNum}}' placeholder-class='placeholder-class'   placeholder="如道路/门牌号/小区/写字楼等" /> -->
                </div>
            </div>
            <div class="default-settings">
                <div class="default-settings-box">
                    <div class="settings-top">
                        <div class="address-type">地址标签</div>
                        <div class="address-list">
                            <div @click='chooseDefaultFn' :class="chooseIndex==1?'active address-item':'address-item'">住宅</div>
                            <div @click='chooseDefaultFn' :class="chooseIndex==2?'active address-item':'address-item'">公司</div>
                            <div @click='chooseDefaultFn' :class="chooseIndex==3?'active address-item':'address-item'">学校</div>
                            <div @click='chooseDefaultFn' :class="chooseIndex==4?'active address-item':'address-item'">其他</div>
                        </div>
                    </div>
                    <div class="settings-bottom">
                        <div class="set-default">设为默认地址</div>
                        <!-- <switch bindchange='bindchange' color='#ea85b2'></switch> -->
                    </div>
                </div>
            </div>
            <!-- 确认并保存按钮 -->
            <div class="save-btn" @click='savaSubmitFn'>确认并保存</div>
        </div>
    </div>
</template>
<script>
import headTop from "components/headTop";
export default {
    data(){
        return{
            chooseIndex:1
        }
    },
    components:{
        headTop
    },
    methods:{
        chooseDefaultFn(){

        },
        savaSubmitFn(){
            
        },
        backBtn(){
            // location.replace(location)
            window.history.back()
        }
    },
    mounted(){
        console.log(vueApp.tabbar)
        vueApp.tabbar.show=false
    }
}
</script>
<style lang="less" scoped>
#address{
    .gather-title{
        width: 100%;height: 50Px;line-height: 50Px;
        font-size: 40px;color: #000;
        padding: 0 20px;box-sizing: border-box;
        font-weight: bold;
        background: #ffffff;
        box-shadow: 0 2px 10px rgba(209, 208, 208, 0.8);
        display: flex;justify-content:space-between;align-items: center;
        div:nth-of-type(3){
            width: 100px;
        }
        img{
            width: 40Px;
        }
    }
    .add-address-input{
            width: 100%;
            background: #fff;
            border-bottom: 1px solid #e6e6e6;
            margin-top: 20px;
            .add-address-type{
                position: relative;
                width: 705px;height: 98px;
                margin: 0 auto;
                display: flex;align-items: center;
                .goto-icon1{
                    position: absolute;right: 0;
                    width: 10px;height: 0;
                    display: block;
                }
                .input-type{
                    width: 170px;
                    font-size: 30px;color: #3b3b3b;
                }
                ._input{
                    font-size: 30px; color: #333333;
                    flex: 1;
                }
                .city-inp{
                    position: absolute;right: 0  ;z-index: 5;
                    width: 540px;height: 100px;
                    .picker-span{
                        width: 540px;height: 100px;
                    }
                }
                .placeholder-class{
                    font-size: 28px;color: #b2b2b2;
                }
            }
        }
        .detailed-address{
            width: 100%;
            background: #fff;
            margin-bottom: 44px; 
            .detailed-box{
                width: 705px;
                margin: 0 auto;
                display: flex;
                .input-type{
                    width: 170px;
                    font-size: 30px;color: #3b3b3b;
                    margin-top: 19px; 
                }
                .detailed-inp{
                    flex: 1;
                    padding: 19px 0;
                    height: 125px;
                    font-size: 30px;color: #333333;
                }
                .placeholder-class{
                    font-size: 28px;color: #b2b2b2;
                }
            }
        }
        .default-settings{
            width: 100%;
            background: #fff;
            .default-settings-box{
                width: 705px;
                margin: 0 auto;
                .settings-top{
                    padding: 30px 0 67px;
                    overflow: hidden;
                    .address-type{
                        float: left;
                        font-size: 30px;
                        color: #3b3b3b;
                    }
                    .address-list{
                        margin-left: 36px; 
                        float: left;
                        .address-item{
                            float: left;
                            width: 62px;
                            height: 34px;
                            font-size: 24px;
                            text-align: center;
                            line-height: 34px;
                            color: #b3b3b3;
                            margin-right: 22px; 
                            border: 1PX solid  #b3b3b3;
                            &.active{
                                border: 1PX solid  #ea85b2;
                                color: #ea85b2;
                            }
                        }
                    }
                }
                .settings-bottom{
                    padding-bottom: 30px;
                    font-size: 30px;
                    color: #3b3b3b;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .set-default{

                    }
                    switch{
                        width: 107px;
                        height: 60px;  
                    }
                    .wx-switch-input::before{
                        background: #E6E6E6!important;
                    }
                }
            }
        }
        .save-btn{
            width: 650px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            color: #fff;
            margin: 0 auto;
            font-size: 36px;
            background: #ea85b2;
            border-radius: 10px;
            margin-top: 103px;  
        }
    
}
</style>


