<template>
    <div class="kinds" id="kinds">
        <div class="kindes-content">
            <div class="gather-title">
                <div @click="backBtn"><img src="/static/images/gather/back-icon.png" alt="" srcset=""></div>
                <div>{{title}}</div>
                <div @click="changeTypeChunkBtn">
                    <img class="goods-icon" src="/static/images/index/kinds/goods-icon.png" alt="" srcset="">
                </div>
            </div>
            <div class="content-m">
                <div class="main-img">
                    <img src="/static/images/index/kinds/main-big-img.png" alt="" srcset="">
                </div>
                <div class="goods-list">
                     <ul>
                        <li v-for="item in gatherList" @click="detailBtn(item)">
                            <div class="img-box">
                                <img :src="item.img_url" alt="" srcset="">
                            </div>
                            <div class="title">{{item.name}}</div>
                            <div class="price">{{item.price}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "src/services/api"
import geturlParmes from "static/js/geturlParmes"

export default {
    data(){
        return{
            typeChunk:true,
            title:'摄像机',
            gatherList:[]
        }
    },
    components:{
    },
    methods:{
       changeTypeChunkBtn(){
           window.location.href=vueApp.href('shopping')
       },
       backBtn(){
            window.history.back()
       },
       detailBtn(item){
            window.location.href=vueApp.href('detail')+'?id='+item.id
       },
        // 标记sign
        signFunc(){
            Api.allkind().then(res=>{
                var signArr=[]
                res.result.forEach(element => {
                    if(element.class==geturlParmes("sign")){
                        signArr.push(element)
                    }
                });
                this.gatherList=signArr;
            })
        }
    },
    mounted(){
        this.title=decodeURIComponent(geturlParmes("name"))
        this.signFunc()
    }
}
</script>
<style lang="less" scoped>
#kinds{
    height: 100%;
    .kindes-content{
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        .gather-title{
            width: 100%;height: 50Px;line-height: 50Px;
            font-size: 40px;color: #000;
            padding: 0 20px;box-sizing: border-box;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
            display: flex;justify-content:space-between;align-items: center;
            img{
                width: 40Px;
            }
            div:nth-of-type(2){
                height: 50Px;
            }
            .goods-icon{
                width: 26Px;
                margin: 0 7Px;
            }
        }
        .content-m{
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            .main-img{
                img{
                    width: 100%;
                }
            }
            .goods-list{
                margin-top: 20px;
                ul{
                    width: 100%;
                    flex: 1;
                    display: flex;justify-content: space-between;
                    flex-wrap: wrap;
                    li{
                        width: 370px;
                        padding: 20px;box-sizing: border-box;
                        margin-bottom: 20px;
                        text-align: left;
                        background: #ffffff;
                        .img-box{
                            width: 300px;height: 300px;
                            margin:0 auto 12px;
                            img{
                                width: 100%;
                            }
                        }
                        .title{
                            width: 100%;height: 35Px;
                            overflow: hidden;
                            font-size: 12Px;color: rgb(97, 93, 93);
                            text-overflow:ellipsis;  
                            white-space: normal;  
                            display:-webkit-box;  
                            -webkit-box-orient:vertical;  
                            -webkit-line-clamp:2;/*规定最多显示两行*/ 

                        }
                        .price{
                            font-size: 16Px;color: #fa6d82;
                        }
                    }
                }
            }
        }
        
    }
}
</style>

