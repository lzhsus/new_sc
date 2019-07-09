<template>
    <div class="text" id="text">
       萌卡叶敏
        <tabbar :seleid="seleid"></tabbar>
    </div>
</template>

<script>
import tabbar from "components/tabbar";

export default {
    data(){
        return{
            seleid:3,
            tem:{
                'W-01-H-01-07-01': {
                    name: '7图①-7竖图',
                    width: 1102,
                    height: 584,
                    coordinate: [
                        {type: 'info',  data: [0, 0, 142, 584]},
                        {type: 'photo', data: [142, 0, 384, 584]}, 
                        {type: 'photo', data: [526, 0, 192, 292]}, 
                        {type: 'photo', data: [718, 0, 192, 292]}, 
                        {type: 'photo', data: [910, 0, 192, 292]},
                        {type: 'photo', data: [526, 292, 192, 292]},
                        {type: 'photo', data: [718, 292, 192, 292]},
                        {type: 'photo', data: [910, 292, 192, 292]}
                    ]
                },
            }
        }
    },
    components:{
          tabbar
    },
    methods:{

    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>

</style>

