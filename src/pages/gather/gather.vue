<template>
    <div class="gather" id="gather">
        <div class="gather-content">
            <div class="gather-title">
                <div @click="backBtn"><img src="/static/images/gather/back-icon.png" alt="" srcset=""></div>
                <div>{{title}}</div>
                <div @click="changeTypeChunkBtn">
                    <img v-if="typeChunk" src="/static/images/gather/gather-more-1.png" alt="" srcset="">
                    <img v-else src="/static/images/gather/gather-more-2.png" alt="" srcset="">
                </div>
            </div>
            <div class="gather-maiddle">
                <div class="ul-box">
                    <ul>
                        <li v-for="item in gatherList" @click="detailBtn(item)">
                            <div class="img-box">
                                <img :src="item.img_url" alt="" srcset="">
                            </div>
                            <div class="title">{{item.name}}</div>
                            <div class="price">{{item.price}} 元/天</div>
                        </li>
                    </ul>
                </div>
                <!-- <div class="placeholder"></div> -->
            </div>
        </div>
    </div>
</template>
<script>
import kindGather from "static/jsop/kindGather.json"
import geturlParmes from "static/js/geturlParmes"
import Api from "src/services/api"
export default {
    data(){
        return{
            sign:'',
            title:'',
            typeChunk:true,
            gatherList:[]
        }
    },
    methods:{
        changeTypeChunkBtn(){
            this.typeChunk=!this.typeChunk
        },
        backBtn(){
            window.history.back()
        },
        detailBtn(item){
            window.location.href=vueApp.href('detail')+'?id='+item.id
        },
        allkindeFunc(){
             Api.allkind().then(res=>{
                var classArr=[];
                var signArr=[]
                res.result.forEach(element => {
                    if(element.class==geturlParmes("class")){
                        classArr.push(element)
                    }
                });
                classArr.forEach(element => {
                    if(element.sign==geturlParmes('sign')){
                        signArr.push(element)
                    } 
                });
                this.gatherList=signArr;
                console.log(this.gatherList)
            })
        }
    },
    mounted(){
        this.allkindeFunc()
    }
}
</script>
<style lang="less" scoped>
#gather{
    height: 100%;
    .gather-content{
        height: 100%;
        flex: 1;display: flex;justify-content: flex-start;
        flex-direction: column;
        .gather-title{
            width: 100%;height: 50Px;line-height: 50Px;
            font-size: 40px;color: #000;
            padding: 0 20px;box-sizing: border-box;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 2px 10px rgba(177, 175, 175, 0.8);
            display: flex;justify-content:space-between;align-items: center;
            img{
                width: 40Px;
            }
        }
        .gather-maiddle{
            flex: 1;display: flex;height: 100%;
            flex-direction: column;justify-content: flex-start;
            .placeholder{
                width: 100%;height: 50Px;
            }
            .ul-box{
                margin-top: 20px;
                // margin-bottom: 40px;
                overflow-x: hidden;
                overflow-y: scroll;
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


