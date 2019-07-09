<template>
    <div class="text" id="order">
        <div class="gather-title">
            <div @click="backBtn"><img src="/static/images/gather/back-icon.png" alt="" srcset=""></div>
            <div>订单列表</div>
            <div>
                <img src="/static/images/gather/gather-more-1.png" alt="" srcset="">
            </div>
        </div>
        <div class="order-content">
            <div class="orderDetails-header">
                <div @click='chooseThis(1)' :class="chooseThisIndex==1?'nav-type active':'nav-type'">全部</div>
                <div @click='chooseThis(2)' :class="chooseThisIndex==2?'nav-type active':'nav-type'">待付款</div>
                <div @click='chooseThis(3)' :class="chooseThisIndex==3?'nav-type active':'nav-type'">待收货</div>
                <div @click='chooseThis(4)' :class="chooseThisIndex==4?'nav-type active':'nav-type'">已签收</div>
                <div @click='chooseThis(5)' :class="chooseThisIndex==5?'nav-type active':'nav-type'">其他</div>

            </div>
            <div class="order-list" v-if="chooseThisIndex==1">
                <div class="order-item" v-for="item in allList">
                    <div class="order-nav">
                        <div class="order-code">订单编号：{{item.order_num}}</div>
                        <div class="order-schedule">{{item.static_type}}</div>
                    </div>
                    <div class="order-info">
                        <div class="order-info-left">
                            <img class="order-img" :src='item.img_url' />
                        </div>
                        <div class="order-info-right">
                            <div class="order-info-right-left">
                                <div class="order-info-title">{{item.title}}</div>
                                <div class="order-info-type">{{item.type}}</div>
                            </div>
                            <div class="order-info-right-right">
                                <div class="order-info-price">￥{{item.price}}</div>
                                <div class="order-info-count">x{{item.num}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-btn">
                        <div class="cancel-order">取消订单</div>
                        <div class="pay">付款</div>
                    </div>
                </div>
            </div>
             <div class="order-list" v-if="chooseThisIndex==2">
                <div class="order-item" v-for="item in allList" v-if="!item.static">
                    <div class="order-nav">
                        <div class="order-code">订单编号：{{item.order_num}}</div>
                        <div class="order-schedule">{{item.static_type}}</div>
                    </div>
                    <div class="order-info">
                        <div class="order-info-left">
                            <img class="order-img" :src='item.img_url' />
                        </div>
                        <div class="order-info-right">
                            <div class="order-info-right-left">
                                <div class="order-info-title">{{item.title}}</div>
                                <div class="order-info-type">{{item.type}}</div>
                            </div>
                            <div class="order-info-right-right">
                                <div class="order-info-price">￥{{item.price}}</div>
                                <div class="order-info-count">x{{item.num}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-btn">
                        <div class="cancel-order">取消订单</div>
                        <div class="pay">付款</div>
                    </div>
                </div>
            </div>
             <div class="order-list" v-if="chooseThisIndex==3">
                <div class="order-item" v-for="item in allList" v-if="item.static==2">
                    <div class="order-nav">
                        <div class="order-code">订单编号：{{item.order_num}}</div>
                        <div class="order-schedule">{{item.static_type}}</div>
                    </div>
                    <div class="order-info">
                        <div class="order-info-left">
                            <img class="order-img" :src='item.img_url' />
                        </div>
                        <div class="order-info-right">
                            <div class="order-info-right-left">
                                <div class="order-info-title">{{item.title}}</div>
                                <div class="order-info-type">{{item.type}}</div>
                            </div>
                            <div class="order-info-right-right">
                                <div class="order-info-price">￥{{item.price}}</div>
                                <div class="order-info-count">x{{item.num}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-btn">
                        <div class="cancel-order">取消订单</div>
                        <div class="pay">付款</div>
                    </div>
                </div>
            </div>
             <div class="order-list" v-if="chooseThisIndex==4">
                <div class="order-item" v-for="item in allList" v-if="item.static==3">
                    <div class="order-nav">
                        <div class="order-code">订单编号：{{item.order_num}}</div>
                        <div class="order-schedule">{{item.static_type}}</div>
                    </div>
                    <div class="order-info">
                        <div class="order-info-left">
                            <img class="order-img" :src='item.img_url' />
                        </div>
                        <div class="order-info-right">
                            <div class="order-info-right-left">
                                <div class="order-info-title">{{item.title}}</div>
                                <div class="order-info-type">{{item.type}}</div>
                            </div>
                            <div class="order-info-right-right">
                                <div class="order-info-price">￥{{item.price}}</div>
                                <div class="order-info-count">x{{item.num}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-btn">
                        <div class="cancel-order">取消订单</div>
                        <div class="pay">付款</div>
                    </div>
                </div>
            </div>
              <div class="order-list" v-if="chooseThisIndex==5">
                <div class="order-item" v-for="item in allList" v-if="item.static>3">
                    <div class="order-nav">
                        <div class="order-code">订单编号：{{item.order_num}}</div>
                        <div class="order-schedule">{{item.static_type}}</div>
                    </div>
                    <div class="order-info">
                        <div class="order-info-left">
                            <img class="order-img" :src='item.img_url' />
                        </div>
                        <div class="order-info-right">
                            <div class="order-info-right-left">
                                <div class="order-info-title">{{item.title}}</div>
                                <div class="order-info-type">{{item.type}}</div>
                            </div>
                            <div class="order-info-right-right">
                                <div class="order-info-price">￥{{item.price}}</div>
                                <div class="order-info-count">x{{item.num}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-btn">
                        <div class="cancel-order">取消订单</div>
                        <div class="pay">付款</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tabbar from "components/tabbar";
import { setTimeout } from 'timers';
import geturlParmes from "static/js/geturlParmes"
export default {
    data(){
        return{
            seleid:3,
            chooseThisIndex:1,
            allList:[{
                id:1,
                order_num:"E20190401123456789",
                title:"巧虎电视小红盒子巧虎电视小红盒子",
                img_url:"/static/images/index/kind-item-1.png",
                type:"套餐-",
                price:599,
                num:2,
                static:0,//0未付款 //1已付款 //2已发货 //3已签收 //4申请退款中 //5已退款
            },{
                id:2,
                order_num:"E20190401123456789",
                title:"巧虎电视小红盒子巧虎电视小红盒子",
                img_url:"/static/images/index/kind-item-1.png",
                type:"套餐-",
                price:599,
                num:2,
                static:1,//0未付款 //1已付款 //2已发货 //3已签收 //4申请退款中 //5已退款
            },{
                id:3,
                order_num:"E20190401123456789",
                title:"巧虎电视小红盒子巧虎电视小红盒子",
                img_url:"/static/images/index/kind-item-1.png",
                type:"套餐-",
                price:599,
                num:2,
                static:2,//0未付款 //1已付款 //2已发货 //3已签收 //4申请退款中 //5已退款
            },{
                id:4,
                order_num:"E20190401123456789",
                title:"巧虎电视小红盒子巧虎电视小红盒子",
                img_url:"/static/images/index/kind-item-1.png",
                type:"套餐-",
                price:599,
                num:2,
                static:3,//0未付款 //1已付款 //2已发货 //3已签收 //4申请退款中 //5已退款
            },{
                id:5,
                order_num:"E20190401123456789",
                title:"巧虎电视小红盒子巧虎电视小红盒子",
                img_url:"/static/images/index/kind-item-1.png",
                type:"套餐-",
                price:599,
                num:2,
                static:4,//0未付款 //1已付款 //2已发货 //3已签收 //4申请退款中 //5已退款
            },{
                id:6,
                order_num:"E20190401123456789",
                title:"巧虎电视小红盒子巧虎电视小红盒子",
                img_url:"/static/images/index/kind-item-1.png",
                type:"套餐-",
                price:599,
                num:2,
                static:5,//0未付款 //1已付款 //2已发货 //3已签收 //4申请退款中 //5已退款
            }]
        }
    },
    components:{
          tabbar
    },
    methods:{
        backBtn(){
            window.history.back()
        },
        chooseThis(index){
            this.chooseThisIndex = index
        },
        orderStaticFunc(){
            var arr=this.allList
            arr.forEach(element => {
                if(!element.static){
                    //0未付款
                    element.static_type="未付款";
                    return;
                } 
                if(element.static==1){
                    //1已付款 
                    element.static_type="已付款";
                    return;
                }
                if(element.static==2){
                   //2已发货 
                    element.static_type="已发货";
                    return;
                }
                if(element.static==3){
                    //3已签收 
                    element.static_type="已签收";
                    return;
                }
                if(element.static==4){
                   //4申请退款中 
                    element.static_type="申请退款中";
                    return;
                }
                if(element.static==5){
                  //5已退款
                    element.static_type="已退款";
                    return;
                }
            });
            console.log(arr)
            this.allList=arr;
        }
    },
    mounted(){
        this.chooseThisIndex=geturlParmes('id')
        this.orderStaticFunc()
    }
}
</script>
<style lang="less" scoped>
#order{
    width: 100%;height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .gather-title{
        width: 100%;height: 50Px;line-height: 50Px;
        font-size: 40px;color: #000;
        padding: 0 20px;box-sizing: border-box;
        font-weight: bold;
        background: #ffffff;
        box-shadow: 0 2px 10px rgba(185, 184, 184, 0.8);
        display: flex;justify-content:space-between;align-items: center;
        img{
            width: 40Px;
        }
    }
    .order-content{
        width: 100%;height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        .orderDetails-header{
            width: 705px;
            height: 108px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .nav-type{
                width: 106px;
                text-align: center;
                font-size: 28px;
                color: #333333;
                height: 54px;
                box-sizing: border-box;
                &.active{
                    border-radius: 4px; 
                    border-bottom: 4px solid #fa7eb4; 
                }
            }
        }
        .order-list{
            width: 705px;height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;
            margin: 0 auto 40px;
            .order-item{
                width: 100%;
                border-radius: 20px;
                overflow: hidden; 
                margin-bottom: 20px;
                &:last-child{
                    margin-bottom: 0;
                } 
                .order-nav{
                    background: #f4fcfd;
                    width: 100%;
                    display: flex;
                    padding: 27px 0 23px;
                    justify-content: space-between;
                    .order-code{
                        margin-left: 21px;
                        font-size: 28px;
                        color: #999999;
                    }
                    .order-schedule{
                        margin-right: 21px; 
                        font-size: 28px;
                        color: #fa7eb4;

                    }
                }
                .order-info{
                    background: #fff;
                    padding:24px 0 30px;
                    display: flex;
                    // justify-content: space-between; 
                    border-bottom: 1PX solid #f0f0f0;  
                    .order-info-left{
                        margin-left: 21px;
                        .order-img{
                            width: 180px;height: 180px;
                        }
                    }
                    .order-info-right{
                        margin-left: 24px;
                        margin-right: 21px; 
                        display: flex;
                        justify-content: space-between;
                        flex: 1;
                        .order-info-right-left{
                            width: 281px;
                            text-align: justify;
                            display: flex;
                            flex-wrap: wrap;
                            // flex-direction: column;
                            flex-wrap: wrap;
                            align-content: space-between;
                            .order-info-title{
                                margin-top: 13px;
                                font-size: 28px;
                                color: #3b3b3b;
                            }
                            .order-info-type{
                                font-size: 22px;
                                color: #999999;
                                margin-bottom: 25px;
                            }
                        }
                        .order-info-right-right{
                            .order-info-price{
                                font-size: 28px;
                                color: #3b3b3b;
                            }
                            .order-info-count{
                                font-size: 28px;
                                color: #3b3b3b;
                                text-align: right;
                            }
                        }
                    } 
                }
                .order-btn{
                    padding: 20px 0;
                    background: #fff;
                    display: flex;
                    justify-content: flex-end;
                    .cancel-order{
                        margin-right: 20px; 
                        width: 150px;
                        padding: 12px 0;
                        text-align: center;
                        border: 1PX solid #999999;
                        border-radius: 50px; 
                        font-size:  28px;
                        color: #999999;
                    }
                    .pay{
                        margin-right: 20px; 
                        width: 150px;
                        padding: 12px 0;
                        text-align: center;
                        border: 1PX solid #fa7eb4;
                        border-radius: 50px;
                        font-size:  28px;
                        color: #fa7eb4;
                    }
                }
            }
        }
    }
}
</style>

