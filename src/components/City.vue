<template>
    <div>
        <el-popover
            placement="top-start"
            title="城市概况"
            width="200"
            trigger="hover"
            >
            <p>城市名：{{city.cityName}}</p>
            <p>人口：{{city.population}}</p>
            <i class="el-icon-s-home" slot="reference" :style="cityStyle"></i>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: "City",
        props:{
            city:Object
            // name:String,
            // population:Number,
            // level:Number,
            // master:String
        },
        data() {
            return {
                cityStyle:{
                    color: '#133961',
                    fontSize: '38px'
                },
                // screenWidth:'600px',
                // screenHeight:'337px'
            }
        },
        computed: {

        },
        methods: {
            
        },
        mounted() {

        },


    }

</script>

<style>



</style>