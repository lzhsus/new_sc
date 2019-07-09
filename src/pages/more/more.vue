<template>
    <div class="more" id="more">
        <div class="more-content">
            <div class="placeholder">
                <div class="placeholder-content">
                    <div class="address" @click="lookAddressBtn">上海市</div>
                </div>
            </div>
            <div class="more-middle">
                <div class="_content">
                    <ul class="list-left">
                        <li v-for="item in leftList" :class="item.class==classType?'active':''" @click="leftBtn(item)">
                            {{item.title}}
                        </li>
                    </ul>
                    <div class="list-right">
                        <ul>
                            <li v-for="item in rightList" v-if="item.class==classType" @click="rightBtn(item)">
                                <div class="concreteness">
                                    <div class="_img">
                                        <img :src="item.img_url" alt="" srcset="">
                                    </div>
                                    <h4>{{item.name}}</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
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
import Api from "src/services/api"
import { Popup ,Picker } from 'mint-ui';
import more from "static/jsop/more.json"
import tabbar from "components/tabbar";

export default {
    data(){
        return{
            listId:10001,
            classType:'xj',
            seleid:2,
            popupVisible:false,
            slots:[
				{
				flex: 1,
					values: ['上海市'],
					className: 'slot1',
					textAlign: 'center'
				}
			],
            leftList:[],
            rightList:[]
        }
    },
    components:{
        "mt-popup":Popup,
        'mt-picker':Picker,
        tabbar
    },
    methods:{
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
        leftBtn(item){
            sessionStorage.setItem("item", JSON.stringify(item));
            this.classType=item.class
        },
        rightBtn(item){
            window.location.href=vueApp.href("gather")+"?sign="+item.sign+"&class="+item.class
        },
        moreFunc(cd){
            Api.more().then(res=>{
                // var res=JSON.parse(res)
                this.leftList=res.result
                cd()
            })
        },
        moreRightFunc(){
            Api.more_right().then(res=>{
                // var res=JSON.parse(res)
                this.rightList=res.result
            })
        }
    },
    mounted(){
        this.moreFunc(res=>{
            this.moreRightFunc()
        })
        var item=sessionStorage.getItem("item")||"{}"
        item=JSON.parse(item)
        this.classType=item.class||"xj";  
    }
}
</script>
<style lang="less" scoped>
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
#more{
    width: 100%;height: 100%;
    background: #f8f8f8;
    .more-content{
        width: 100%;height: 100%;
        flex: 1;display: flex;
        flex-direction: column;
        .placeholder{
            width: 100%;height: 48Px;
            box-shadow: 0 2px 20px rgb(192, 190, 190);
            .placeholder-content{
                width: 100%;height: 100%;
                background: #fff;
                display: flex;justify-content: flex-start;align-items: center;
                .address{
					padding: 0 30px;box-sizing: border-box;
					width: 200px;
					position: relative;
					&::after{
						position: absolute;left: 24px;top: 40%;
						border-right: 1Px solid #bfbfbf;
						border-top: 1Px solid #bfbfbf;
						transform:translateY(-50%) rotate(135deg);
						display: table;content: '';
						width: 7Px;height:7Px ;
					}
				}
            }
        }
        .more-middle{
            width: 100%;height: 99%;
            margin-top: 1%;
            display: flex;
            flex-direction:column;
            flex: 1;
            ._content{
                display: flex;
                justify-content: space-between;
                width: 100%;height: 100%;
                // padding-bottom: 50Px;
                .list-left{
                    width: 170px;
                    background: #ffffff;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    li{
                        width: 100%;height: 120px;
                        text-align: center;line-height: 120px;
                        font-size: 28px;color: #5c5454;
                        &.active{
                            font-size: 28px;color: #000000;
                            font-weight: bold;
                            background: #f6f3f4;
                            border-left: 4Px solid rgb(233, 96, 96);
                        }
                    }
                }
                .list-right{
                    width: 540px;
                    margin-right: 20px;
                    background: rgb(247, 244, 244);
                    ul{
                        display: flex;justify-content: space-between;
                        flex-wrap: wrap;
                        li{
                            width: 230px;height: 170px;
                            background: #ffffff;
                            text-align: center;
                            font-size: 28px;color: #5c5454;
                            margin:0 10px 20px 0;
                            border-radius: 12px;
                            overflow: hidden;
                            .concreteness{
                                width: 100%;height: 100%;
                                display: flex;
                                flex-direction: column;justify-content: center;align-items: center;
                                ._img{
                                    width: 112px;height: 67px;
                                    margin-bottom: 20px;
                                    img{
                                        width: 100%;height: 100%;
                                    }
                                }
                                h4{
                                    font-size: 12Px;color: #5c5454;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>


