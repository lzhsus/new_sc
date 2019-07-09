<template>
    <div class="db_index" id="db_index">
        <div class="more-content">
            <h1 class="api-title">more</h1>
            <div class="item-box">
                <div>sign:</div>
                <input type="text">
            </div>
            <div class="item-box">
                <div>class:</div>
                <input type="text">
            </div>
            <div class="item-box">
                <div>title:</div>
                <input type="text">
            </div>
            <div class="submit" @click="moreBtn">moreBtn提交</div>
        </div> 
        <!-- <div class="more-content">
            <h1 class="api-title">more_right</h1>
            <div class="item-box">
                <div>sign:</div>
                <input type="text" id="img4">
            </div>
            <div class="item-box">
                <div>class:</div>
                <input type="text" id="img1">
            </div>
            <div class="item-box">
                <div>name:</div>
                <input type="text" id="img3">
            </div>
            <div class="item-box">
                <div>img_url:</div>
                <input type="file" id="img">
            </div>
            <div class="submit" @click="moreRightBtn">moreRightBtn提交</div>
        </div> -->
        <div class="more-content">
            <h1 class="api-title">allkind</h1>
            <div class="item-box" @click="changeBtn1">
                <div>sign:</div>
                <input type="text" id="img4" v-model="classImg2">
            </div>
            <div class="item-box" @click="changeBtn">
                <div>class:</div>
                <input type="text" id="img1" v-model="classImg1">
            </div>
            <div class="item-box">
                <div>name:</div>
                <input type="text" id="img3">
            </div>
            <div class="item-box">
                <div>price:</div>
                <input type="text" id="img5">
            </div>
            <div class="item-box">
                <div>img_url:</div>
                <input type="file" id="img">
            </div>
            <div class="submit" @click="moreAllKindeBtn">moreAllKindeBtn提交</div>
        </div>

        <mt-popup v-model="popupVisible" position="bottom">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>

        <mt-popup v-model="popupVisible1" position="bottom">
            <mt-picker :slots="slots1" @change="onValuesChange1"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import Vue from 'vue';
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);

export default {
    data(){
        return{
            popupVisible:false,
            slots: [
                {
                    flex: 1,
                    values: ['xj', 'dfxj', 'jt', 'sjj', 'wdq', 'wrj','dg','yb','gd','lyht','jsq','dbt','cc','qt'],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            classImg1:'',
            popupVisible1:false,
            slots1: [
                {
                    flex: 1,
                    values: '',
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['lm','jjsts','21cdyj','jly','7czyxj','7cxj','lyj','tyt','tght','sccf','jtm','xmf','yp','zxdgmd','qxdmgd','zxxgd','dzgd','zmgd','10myb','zxyb','3mzyb','3mxyb','qtfj','qtdg','bxsdtz','dd','ledjgd','faljgd','jtxyd','qjyt','qt','dyj','rmj','lywrj','qt','qjyt','ysb','stnk','sxjzy','dgzy','ajj','djj','dyj','zx','zy/hd','bx','qjsxj','ydsxj','zy/gq','bx/hd','zd','zyj'],
                    className: 'slot3',
                    textAlign: 'left'
                }
            ],
            classImg2:''
        }
    },
    components:{
        
    },
    methods:{
        onValuesChange(picker, values) {
            console.log(picker,values)
            this.classImg1=values[0]
            this.slots1[0].values=[values[0]]
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        },
        onValuesChange1(picker, values) {
            // console.log(picker,values)
            this.classImg2=values[1]
            
            // if (values[0] > values[1]) {
            //     picker.setSlotValue(1, values[0]);
            // }
        },
        changeBtn(){
            this.popupVisible=true;
        },
        changeBtn1(){
            this.popupVisible1=true;
        },
        moreBtn(){},
        moreRightBtn(){
            return;
            var formData=new FormData();
			formData.append("imgUploader",$('#img')[0].files[0])
			formData.append("imgUploader",$('#img1').val())
			formData.append("imgUploader","")
			formData.append("imgUploader",$('#img3').val())
			formData.append("imgUploader",$('#img4').val())
            
			$.ajax({
				url:"http://1434253600.xyz/api/updatamoreright",
				type:"post",
				data:formData,
				cache: false,
				contentType: false,
				processData: false,
				success:res=>{
					console.log(res)
				}
            })
            
        },
        moreAllKindeBtn(){
            var formData=new FormData();
			formData.append("imgUploader",$('#img')[0].files[0])
			formData.append("imgUploader",$('#img1').val())
			formData.append("imgUploader","")
			formData.append("imgUploader",$('#img3').val())
			formData.append("imgUploader",$('#img4').val())
            formData.append("imgUploader",$('#img5').val())
			$.ajax({
				url:"http://1434253600.xyz/api/updataallkind",
				type:"post",
				data:formData,
				cache: false,
				contentType: false,
				processData: false,
				success:res=>{
					console.log(res)
				}
            })
            $('#img3').val('');
            $('#img5').val('')
        }
    },
    mounted(){
       
    }
}
</script>
<style lang="less" scoped>
.mint-popup{
    width: 100%;
    mt-picker{
        width: 100%;
    }
}
#db_index{
    .more-content{
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        .item-box{
            width: 100%;
            padding: 12px 0;box-sizing: border-box;
            display: flex;justify-content:space-around;align-items: center;

            div{
                width: 200px;
                font-size: 28px;color:rgb(245, 186, 186);
            }
            input{
                display: block;
                width: 400px;height: 40px;
                border-radius: 4px;
                padding-left: 20px;box-sizing: border-box;
                border:1px solid #eee;
            } 
        }
        .api-title{
            font-size:30px;
        }
        .submit{
            width: 100%;height: 60px;
            text-align: center;line-height: 60px;
            font-size: 30px;color: #eee;
            background: rgb(236, 135, 135);
            border-radius: 4px;
        }
        .db-box{
            img{
                width: 100%;display: block;
            }
        }
    }
}
</style>

