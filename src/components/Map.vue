<template>
    <div>
        <div class="background" :style="backgroundDiv">
            <City v-for = "(city1,index) in cities" :key="index"  :city="city1"
             :style="{left:city1.positionLeft+'%',top:city1.positionTop+'%', position:'relative', width:'min-content'}">
            </City>
             <!-- <i v-for = "(city1,index) in cities" :key="index" class="el-icon-s-home city" 
                :style="{right:city1.right,top:city1.top, position:'relative',color: '#133961',
                fontSize: '32px'}"></i> -->
        </div>
    </div>
</template>

<script>
// :city="city1"
    // import HelloWorld from '@/components/HelloWorld.vue'
    import City from '@/components/City.vue'
    export default {
        name: "Map",
        components: {
            City
        },
        data() {
            return {
                cities:[
                    {
                        name:'龙华里',
                        population:12000,
                        positionLeft:'18',
                        positionTop:'5',
                    },
                    {
                        name:'龙盛里',
                        population:12000,
                        positionLeft:'20',
                        positionTop:'8',
                    }
                ],
//                 backgroundDiv: {
//                     margin: 'auto',
//                     backgroundImage:'url(' + require('../assets/map/map.jpg') + ')',
//                     backgroundRepeat:'no-repeat',
//                     backgroundSize: '100% auto',
//                     backgroundPosition: 'center center',
//                     // content: '', 
//                     // display: 'block', 
//                     // paddingTop: '100%', //* 代表1：1，如果是想要5：1就是20%，根据图片大小比例，那就自己算一下吧*/ 这块实际上做的就是用before占用一块位置，把相应的高度撑起来～ 
//                     // width: '1200px',
//                     // height: '675px'
//                     // width: screenWidth,
//                     // height: screenHeight
//                     // width: document.body.clientWidth,
//                     // height: document.body.clientHeight
//                 },
                city: {
                    color: '#133961',
                    fontSize: '32px',
                    position: 'relative',
                    
                },
                map: require('../assets/map/map.jpg'),
                // screenWidth:'600px',
                // screenHeight:'337px'
            }
        },
        computed: {
            backgroundDiv(){
                return {
                    margin: 'auto',
                    backgroundImage:'url(' + require('../assets/map/map.jpg') + ')',
                    backgroundRepeat:'no-repeat',
                    backgroundSize: this.width1+' '+this.height1,
                    backgroundPosition: 'center center',
                    width : this.width1,
                    height: this.height1
                }
            },
            width1() {return (document.body.clientWidth)+'px'},
            height1() {return ((document.body.clientWidth / 667) * 335)+'px'}
        },
        methods: {
            
        },
        mounted() {
            //页面初始化获取城市信息
            let param = {
                "province" : "1"
            };
            this.postRequest('/getCitiesInfo',param).then(resp => {
                if (resp) {
                    this.cities = resp.cities;
                }
            }).catch((e) => {
                                console.log('error' + e);
                            });
        },
    }

</script>

<style>
    .city{
        color: '#133961'!important;
        font-size: '16px'!important;
        position: 'relative'!important;
    }


</style>