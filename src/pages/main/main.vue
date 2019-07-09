<template>
    <div class="main" id="main">
          <div class="main-content">
            <div class="head-top">
                <div class="set-btn" @click="setBtnFunc"></div>
                <div v-if="!token" class="user-msg-box buttom" @click="loginBtn">注册/登陆</div>
                <div class="user-msg-box" v-else>
                    <img class="cuserAvatarUrl" :src="headportrait" mode="scaleToFill"/>
                    <div class="userNickName">{{mobile}}</div>
                    <div class="userNickName">{{userinfo.nickname}}</div>
                </div>
            </div>
            <div class="order-static">
                <div @click="orderBtn(1)">全部订单</div>
                <div @click="orderBtn(2)">待付款<span>1</span></div>
                <div @click="orderBtn(3)">已付款</div>
            </div>
            <div class="issue-item">
                <div @click="issueBtn">常见问题</div>
                <div @click="addressBtn">地址管理</div>
            </div>
            <tabbar :seleid="seleid"></tabbar>
        </div>
    </div>
</template>

<script>
import tabbar from "components/tabbar";
export default {
    data(){
        return{
            seleid:5,
            token:'',
            mobile:'',
            headportrait:"",
            userinfo:""
        }
    },
    components:{
        tabbar
    },
    methods:{
        setBtnFunc(){
            if(!this.token){
                vueApp.alert('请前往登陆！')
                return;
            }
            window.location.href=vueApp.href('mset')
        },
        orderBtn(id){
            window.location.href=vueApp.href('order')+'?id='+id
        },
        issueBtn(){},
        addressBtn(){
            // window.location.href=vueApp.config.serverPath+'address'
            // this.$router.push('/address')
            window.location.href=vueApp.href('address')
            // this.$router.push('/'+item.page)
        },
        loginBtn(){
            window.location.href=vueApp.href('login')     
        }
    },
    mounted(){
        if(localStorage.token){
            this.token=localStorage.token
            this.mobile=localStorage.mobile
            this.headportrait=localStorage.headportrait
            this.userinfo=JSON.parse(localStorage.userinfo)
        }else{
            this.token="";
            this.mobile="";
            this.headportrait="";
            // window.location.href=vueApp.href('main')
        }
    }
}
</script>
<style lang="less" scoped>
    #main{
        width: 100%;height: 100%;
        background: #f8f8f8;
        .main-content{
            .head-top{
                width: 100%;height: 440px;
                background: url(http://1434253600.xyz/static/images/main/main-head-bg.jpg?v=2019061410040) center center no-repeat;
                background-size: cover;
                position: relative;
                .set-btn{
                    position: absolute;top: 24px;right: 18px;
                    width: 38px;height: 36px;
                    background: url(http://1434253600.xyz/static/images/main/set-icon.png?v=2019060141040) center center no-repeat;
                    background-size: cover;
                }
                .user-msg-box{
                    width: 100%;
                    position: absolute;top: 118px;
                    display: flex;justify-content: center;
                    flex-direction: column;
                    &.buttom{
                        top: 50%;left: 50%;transform: translate(-50%,-50%);
                        width: 290px;height: 100px;
                        background: rgb(252, 175, 235);
                        border-radius: 50px;
                        font-size: 40px;color: #000;
                        color: #fff;
                    }
                    .cuserAvatarUrl{
                        display: block;
                        width: 140px;height: 140px;
                        overflow: hidden;
                        border-radius: 50%;
                        margin: auto;
                    }
                    .userNickName{
                        margin-top: 20px;
                        font-size: 36px;color: #ffffff;
                        text-align: center;
                    }
                }
            }
            .order-static{
                width: 708px;height: 256px;
                padding: 0 80px;box-sizing:border-box;
                margin:22px auto;
                border-radius: 8px;
                background: #fff;
                display: flex;justify-content: space-between;align-items: center;
                div{
                    width: 140px;
                    text-align: center;
                    padding-top: 100px;
                    font-size: 24px;color:#5a5a5a;
                    position: relative;
                    &:nth-of-type(1){
                        background: url(http://1434253600.xyz/static/images/main/all-orders-icon.png?v=201906141040) center top no-repeat;
                        background-size: 90px 70px;
                    }
                    &:nth-of-type(2){
                        background: url(http://1434253600.xyz/static/images/main/wait-pay-icon.png?v=201906141040) center top no-repeat;
                        background-size: 90px 70px;
                    }
                    &:nth-of-type(3){
                        background: url(http://1434253600.xyz/static/images/main/pay-success-icon.png?v=201906141040) center top no-repeat;
                        background-size: 90px 70px;
                    }
                    span{
                        display: block;
                        position: absolute;top:0;right: 16px;
                        width: 30px;height: 30px;
                        text-align: center;line-height: 30px;
                        font-size: 8Px;color: #fff;
                        border: 1Px solid #fff;
                        border-radius: 50%;
                        background: #ff0000;
                        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
                    }
                }
            }
            .issue-item{
                width: 708px;
                margin: auto;
                display: flex;justify-content: space-between;align-items: center;
                div{
                    width: 344px;height: 250px;
                    font-size: 24px;color:#5a5a5a;
                    text-align: center;
                    background: #ffffff;
                    border-radius: 6px;
                    padding-top: 170px;box-sizing: border-box;
                    &:nth-of-type(1){
                        background: #ffffff url(http://1434253600.xyz/static/images/main/issue-icon.png?v=201906141040) center 60px no-repeat;
                        background-size: 90px 90px;
                    }
                    &:nth-of-type(2){
                        background: #ffffff url(http://1434253600.xyz/static/images/main/address-icon.png?v=201906141040) center 60px no-repeat;
                        background-size: 90px 90px;
                    }
                }
            }
        }
    }
</style>


