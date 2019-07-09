<template>
    <div class="shoppingcart" id="shoppingcart">
        <div class="shoppingcart-content">
            <div class="gather-title">购物车</div>
            <div class="middle-content">
                <div class="middle-list">
                    <ul>
                        <li v-for="(item,index) in orderList">
                            <mt-cell-swipe
                            :right="[{content: '删除',style: { background: 'red', color: '#fff' },
                                handler: () => deleteSection(index)
                            }]">
                                <div style="position: absolute;left: 0px;">
                                    <div class="shopping-all-msg">
                                        <input @click="checkBtn(item)" class="checked" type="radio" :checked="item.checked"/>
                                        <div class="shopping-img">
                                            <img :src="item.img_url" />
                                        </div>
                                        <div class="shopping-msg">
                                            <div>{{item.tiele}}</div>
                                            <div><span>￥</span>{{item.price}}</div>
                                            <div>
                                                <span @click="reduceBtn(item)">-</span>
                                                <input type="number" v-model="item.num" @input="bindinput"/>
                                                <span @click="addBtn(item)">+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </mt-cell-swipe>
                        </li>
                    </ul>
                </div>
                <div class="close-an-account">
                   <div class="settle-accounts-shopping" @click="allCheckedBtn">
                        <input class="checked" type="radio" :checked="allOrderList"/>
                        <div>全部</div>
                    </div>
                    <div class="settle-accounts-money">
                        <div><span>合计：</span><span>￥</span><span>{{priceAll}}</span></div>
                        <div @click="payBtn">结算</div>
                    </div>
                </div>
            </div>
            <tabbar :seleid="seleid"></tabbar>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import tabbar from "components/tabbar";
import { CellSwipe,Radio } from 'mint-ui'

Vue.component(Radio.name, Radio);
Vue.component(CellSwipe.name, CellSwipe,Radio,Radio)
export default {
    data(){
        return{
            seleid:4,
            checked:'33',
            allOrderList:false,
            priceAll:'',
            options : [{}],
            orderList:[
                {
                    id:112,
                    tiele:'巧虎商品描述商品描述商品巧虎商品描述商',
                    img_url:'/static/images/index/kind-item-1.png',
                    num:1, //数量
                    checked:false,  //是否选中
                    isTouchMove:false,// 隐藏按钮
                    price:1 //单价
                }, {
                    id:11,
                    tiele:'巧虎商品描述商品描述商品巧虎商品描述商',
                    img_url:'/static/images/index/kind-item-1.png',
                    num:1,
                    price:2,
                    checked:false,
                    isTouchMove:false,
                }
            ]
        }
    },
    components:{
          tabbar
    },
    methods:{
        deleteSection (index) {
            //请求删除数据的接口  
            var orderList=this.orderList
            orderList.splice(index,1)
            this.orderList=orderList
            this.countPricesFunc()
        },
        checkBtn(e){
            var index=0;
            this.orderList.map(ele=>{
                if(ele.id==e.id){
                    ele.checked=!e.checked
                }
                if(ele.checked){
                    index++
                    if(index==this.orderList.length){
                        this.allOrderList=true
                    }else{
                        this.allOrderList=false
                    }
                }
            })
            this.countPricesFunc()
        },
        bindinput(e){
            var value=e.detail.value
            var id=e.currentTarget.dataset.id
            this.orderList.map(ele=>{
               if(ele.id==id){
                   ele.num=value
               }
            })
            this.countPricesFunc()
        },
        reduceBtn(item){
            // 减少
            this.orderList.map(element => {
                if(element.id==item.id){
                    if(element.num==1){
                        return
                    }
                    element.num--
                }
            });
            this.countPricesFunc()
        },
        addBtn(item){
            // 增加
            this.orderList.map(element => {
                if(element.id==item.id){
                    element.num++
                }
            });
            this.countPricesFunc()
        },
        goShoppingBtn(){
            // 空的
            console.log('去')
        },
        payBtn(){
            console.log('付款')
        },
        allCheckedBtn(){
            if(this.allOrderList){
                // 目前全选，全部取消
                this.allChangeFunc(false)
            }else{
                // 目前没全选，执行全选
                this.allChangeFunc(true)
            }
            this.countPricesFunc()
            this.allOrderList=!this.allOrderList
        },
        // true 全选 false 全部取消
        allChangeFunc(allChange){
            this.orderList.map(ele=>{
                if(allChange){
                    ele.checked=true
                }else{
                    ele.checked=false
                }
            })
        },
        // 计算总价
        countPricesFunc(){
            var priceAll=0;
            this.orderList.map(element => {
                if(element.checked){
                    priceAll=priceAll+element.num*element.price
                }
            })
            this.priceAll=priceAll
        }
    },
    
    mounted(){

    }
}
</script>
<style lang="less" >
.mint-cell:first-child .mint-cell-wrapper{
    height: 200px;

    // .mint-cell-value{
    //     width: 100%;
    //     height: 100%;
    // }
}
.mint-cell-swipe-button{
    // line-height: 100%;
    width: 120px;text-align: center;
    margin-right: 12px;
    font-size: 12Px;
    padding: 0 0;
    line-height: 200px;
    box-sizing: border-box;
}
#shoppingcart{
    width: 100%;height: 100%;
    .shoppingcart-content{
        width: 100%;height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        .gather-title{
            width: 100%;height: 50Px;line-height: 50Px;
            font-size: 40px;color: #000;
            padding: 0 20px;box-sizing: border-box;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 2px 10px rgba(230, 227, 227, 0.8);
        }
        .middle-content{
            width: 100%;height: 100%;
            display: flex;
            flex-direction: column;
            flex: 1;
            .middle-list{
                width: 100%;height: 100%;
                overflow-x: hidden;
                overflow-y: scroll;
                ul{
                    margin-top: 20px;
                    li{
                        width: 100%;
                        background: #ffffff;
                        // padding: 20px;box-sizing: border-box;
                        margin-bottom: 20px;
                        padding: 0 20px;
                        .mint-cell .mint-cell-swipe{
                            height: 300px;
                            .mint-cell-wrapper{
                                width: 100%;height: 200px;
                            }
                        }
                        .shopping-all-msg{
                            width: 100%;
                            margin-right:0;
                            -webkit-transition: all 0.4s;
                            transition: all 0.4s;
                            -webkit-transform: translateX(90px);
                            transform: translateX(90px);
                            margin-left: -90px;
                            // padding-top: 20px;
                            // padding-left: 32px;box-sizing: border-box;
                            display: flex;justify-content: space-between;align-items: center;
                            .checked{
                                width: 50px;height: 50px;
                                border-radius: 50%;
                                border: 1px solid #585858;
                                margin-right: 30px;
                                margin-left: 12px;
                            }
                            .shopping-img{
                                margin-right: 30px;
                                width: 154px;height: 154px;
                                img{
                                    display: block;
                                    width: 154px;height: 154px;
                                }
                            }
                            .shopping-msg{
                                width: 510px;height: 154px;
                                position: relative;
                                div:nth-of-type(1){
                                    font-size: 28px;color: #585858;
                                    text-align: left;
                                    overflow: hidden;
                                    text-overflow:ellipsis;  
                                    white-space: normal;  
                                    display:-webkit-box;  
                                    -webkit-box-orient:vertical;  
                                    -webkit-line-clamp:2;/*规定最多显示两行*/ 
                                }
                                div:nth-of-type(2){
                                    position: absolute;left: 0;bottom: 0;
                                    font-size: 28px;color: #ea85b2;
                                    span{
                                        font-size: 20px;
                                    }
                                }
                                div:nth-of-type(3){
                                    position: absolute;right: 0;bottom: 0;
                                    font-size: 20px;color: #8e8e8e;
                                    display: flex;justify-content: center;align-items: center;
                                      box-sizing: border-box;
                                    span{
                                        width: 46px;height: 42px;
                                        border-top:  1px solid #eeeeee;
                                        border-bottom:  1px solid #eeeeee;
                                        line-height: 42px;text-align: center;
                                          box-sizing: border-box;
                                    }
                                    span:nth-of-type(1){
                                        border-left:  1px solid #eeeeee;
                                        border-radius: 2px 0 0 2px;
                                          box-sizing: border-box;
                                    }
                                    span:nth-of-type(2){
                                        border-right:  1px solid #eeeeee;
                                          box-sizing: border-box;
                                        border-radius: 0 2px 2px 0;
                                    }
                                    input{
                                        width: 74px;height: 42px;
                                        text-align: center;
                                        line-height: -120px;
                                        display: block;
                                        border: 1px solid #eeeeee;
                                        box-sizing: border-box;
                                        min-height: 42px;
                                        outline: none;
                                        -webkit-appearance: none;
                                        border-radius: 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .close-an-account{
                width: 100%;height: 100px;
                background: rgb(214, 235, 243);
                display: flex;justify-content: space-around;align-items: center;
                .settle-accounts-shopping{
                    width: 160px;height: 86px;
                    display: flex;justify-content: flex-start;align-items: center;
                    .checked{
                        width: 50px;height: 50px;
                        border-radius: 50%;
                        border: 1px solid #585858;
                        margin-right: 12px;
                        margin-left: 12px;
                    }
                    div{
                        // font-size: 28px;color: #585858;
                        height: 100%;line-height: 86px;
                    }
                }
                .settle-accounts-money{
                    width:400px;height: 86px;
                    display: flex;justify-content: flex-end;align-items: center;
                    div:nth-of-type(1){
                        // width: 250px;
                        span:nth-of-type(1){
                                font-size: 20px;color: #585858;
                        }
                        span:nth-of-type(2){
                            font-size: 20px;color: #ea85b2;
                        }
                        span:nth-of-type(3){
                            font-size: 28px;color: #ea85b2;
                        }
                    }
                    div:nth-of-type(2){
                        margin-left:12px;
                        width: 136px;height: 60px;
                        text-align: center;line-height: 60px;
                        font-size: 28px;color: #ffffff;
                        background: #ea85b2;
                        border-radius: 30px;
                    }
                }
            }
        }
        
    }
}
</style>

