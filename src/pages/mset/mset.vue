<template>
    <div class="set" id="_set">
        <div class="_set-content">
            <div class="gather-title">
                <div @click="backBtn"><img src="/static/images/gather/back-icon.png" alt="" srcset=""></div>
                <div>设置</div>
                <div></div>
                <!-- <div @click="changeTypeChunkBtn">
                    <img v-if="typeChunk" src="/static/images/gather/gather-more-1.png" alt="" srcset="">
                    <img v-else src="/static/images/gather/gather-more-2.png" alt="" srcset="">
                </div> -->
            </div>
            <div class="qt-content">
                <ul>
                    <li>
                        <div>更换头像</div>
                        <div>
                            <img :src="userinfo.headportrait" alt="" srcset="">
                        </div>
                        <input type="file" name="img" id="img" @change="headchange">
                    </li>
                    <li @click="changeBtn('修改昵称',1)">
                        <div>修改昵称</div>
                        <div>{{userinfo.nickname}}</div>
                    </li>
                    <li @click="changeBtn('修改职业',2)">
                        <div>职业</div>
                        <div>{{userinfo.occupation}}</div>
                    </li>
                    <li class="rec" @click="changeBtn('个性介绍',3)">
                        <div>个性介绍</div>
                        <div>{{userinfo.introduce}}</div>
                    </li>
                    <li class="pro" @click="changeBtn('修改密码',4)">
                        <div>密码管理</div>
                        <div>修改</div>
                    </li>
                    <li @click="addressBtn">
                        <div>收货人信息</div>
                        <div></div>
                    </li>
                    <li class="about" @click="aboutBtn">
                        <div>关于我们</div>
                        <div></div>
                    </li>
                </ul>
            </div>
            <div class="drop-out" @click="outbtn">退出登录</div>
        </div>
        <div class="pop-box" v-if="popShow==1">
            <div class="pop-content">
                <div class="pop-title">{{title}}</div>
                <input class="_input" type="text" v-model="val" @input="valFunc">
                <div class="qr-btn" @click="sunmitBtn">确认</div>
                <div class="clear-btn" @click="clearBtn">X</div>
            </div>
        </div>
        <div class="pop-box" v-if="popShow==2">
            <div class="pop-img">
                <!-- <img src="/static/images/index/ad-item-2.png" alt="" srcset=""> -->
                <img src="/static/images/main/xy-item.png" alt="" srcset="">
                <div class="clear-btn" @click="clearBtn">X</div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "src/services/api"
export default {
    data(){
        return{
            popShow:0,
            title:"",
            val:"",
            userinfo:"",
            sign:''
        }
    },
    components:{
    },
    methods:{
        backBtn(){
            window.history.back()
        },
        addressBtn(){
            window.location.href=vueApp.href('address')
        },
        clearBtn(){
            this.popShow="";
        },
        changeBtn(tit,sign){
            console.log(tit,sign)
            this.title=tit
            this.sign=sign;
            this.popShow=1
        },
        aboutBtn(){
            this.popShow=2
        },
        headchange(){
            var formData=new FormData();
            formData.append("imgUploader",$('#img')[0].files[0]);
            formData.append("imgUploader",localStorage.token);
            $.ajax({
				url:"http://1434253600.xyz/api/uploadhead",
				type:"post",
				data:formData,
				cache: false,
				contentType: false,
				processData: false,
				success:res=>{
					if(res.success){
                        this.userinfoFunc()
                    }else{
                        vueApp.alert(res.msg)
                    }
				}
			})
        },
        sunmitBtn(){
            if(/^\s*$/.test(this.val)){
                vueApp.alert("内容不可为空！")
                return;
            }
            var token=localStorage.token
            Api.changeNickName({
				token:token,
                val:this.val,
                sign:this.sign
			}).then(res=>{
				if(res.success){
                    this.userinfoFunc()
				}else{
					vueApp.alert(res.msg)
				}
			})
        },
        userinfoFunc(){
            Api.userinfo({
				token:localStorage.token,
			}).then(res=>{
				if(res.success){
                    console.log(res)
                    var userinfo=res.result.userinfo
					localStorage.headportrait="http://1434253600.xyz/"+userinfo.headportrait
                    userinfo.headportrait="http://1434253600.xyz/"+userinfo.headportrait;
                    localStorage.userinfo=JSON.stringify(userinfo)
                    console.log(userinfo)
                    this.userinfo=userinfo;
                    window.location.href=vueApp.href("mset")
				}else{
					vueApp.alert(res.msg)
				}
			})
        },
        valFunc(e){
            this.val=e.target.value
        },
        outbtn(){
            localStorage.removeItem("token")
            localStorage.removeItem("mobile")
            localStorage.removeItem("headportrait")
            vueApp.alert("成功退出！").then(res=>{
                window.location.href=vueApp.href('main')
            })
        }
    },
    mounted(){
        this.userinfo=JSON.parse(localStorage.userinfo)
    }
}
</script>
<style lang="less" scoped>
#_set{
    .pop-box{
        width: 100%;height: 100%;
        position: fixed;top: 0;left: 0;
        background: rgba(0, 0, 0, 0.6);
        .pop-img{
            position: relative;top: 50%;left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 10px;
            width: 640px;height: 800px;
            overflow-x: hidden;
            overflow-y: scroll;
            img{
                width: 100%;height: 2000px;
            }
            .clear-btn{
                width: 50px;height: 50px;
                text-align: center;line-height: 50px;
                position: absolute;top: 0;right: 0;
            }
        }
        .pop-content{
            position: relative;top: 50%;left: 50%;
            transform: translate(-50%,-50%);
            width: 600px;height: 400px;
            background: #ffffff;
            border-radius: 10px;
            // display: flex;justify-content: center;align-items: center;
            // flex-direction: column;
            .pop-title{
                font-size: 30px;
                width: 100%;height: 100px;
                text-align: center;line-height: 100px;
                
            }
            ._input{
                display: block;
                position: absolute;bottom: 160px;left: 50%;transform: translateX(-50%);
                width: 80%;height: 60px;
                font-size: 30px;
                border: 0;
                border-bottom: 1px solid rgb(236, 229, 243);
            }
            .qr-btn{
                position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);
                width: 80%;height: 100px;
                text-align: center;line-height: 100px;
                border-radius: 20px;
                font-size: 30px;color: #eeeeee;
                background: rgb(233, 142, 142);
            }
            .clear-btn{
                width: 50px;height: 50px;
                text-align: center;line-height: 50px;
                position: absolute;top: 0;right: 0;
            }
        }
    }
    ._set-content{
         .gather-title{
            width: 100%;height: 50Px;line-height: 50Px;
            font-size: 40px;color: #000;
            padding: 0 20px;box-sizing: border-box;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 2px 10px rgba(223, 220, 220, 0.8);
            display: flex;justify-content:space-between;align-items: center;
            img{ width: 40Px; }
            div:nth-of-type(3){ width: 40Px;}
        }
        .qt-content{
            margin-top: 10px;
            ul{
               
                li{
                    background: #ffffff;
                    width: 100%;height: 100px;
                    padding: 0 20px;box-sizing: border-box;
                    border-bottom: 1px solid #eeeeee;
                    display: flex;justify-content: space-between;align-items: center;
                    position: relative;
                    img{
                        width: 80px;height: 80px;
                    }
                    #img{
                        position: absolute;top: 0;left: 0;
                        width: 100%;height: 100%;
                        display: block;
                        opacity: 0;
                    }
                    &.rec{
                        div:nth-of-type(2){
                            position: relative;
                            padding-right: 40px;
                            font-size: 30px;
                            &::before{
                                position: absolute;top: 50%;right: 6px;
                                display: table;content: '';
                                width: 20px;height: 20px;
                                transform: rotate(45deg) translateY(-70%);
                                border-top: 1px solid #999999;
                                border-right: 1px solid #999999;
                                margin-right: 12px;
                            }
                        }
                    }
                    &.pro{
                        margin: 20px 0 0;
                    }
                    &.about{
                        margin: 20px 0;
                        div:nth-of-type(2){
                            width: 20px;height: 20px;
                            transform: rotate(45deg);
                            border-top: 1px solid #999999;
                            border-right: 1px solid #999999;
                            margin-right: 12px;
                        }
                    }
                }
            }
        }
        .drop-out{
            width: 100%;height: 100px;
            text-align: center;line-height: 100px;
            font-size: 40px;
            background: rgb(255, 255, 255);
        }
    }
}
</style>

