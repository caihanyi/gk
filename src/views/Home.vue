<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <div class="pdf">
        <el-popover placement="top" width="800" trigger="click" v-model="visible">
          <pdf ref="pdf" :src="'/pdf/'+src"></pdf>
          <div class="confirm">
            <el-button type="primary" size="mini" @click="visible = false" >确定</el-button>
          </div>
          <el-link slot="reference"   target="_blank">《用户协议》</el-link>
        </el-popover>
  <!-- <embed src="/pdf/20180527-tianfeng.pdf" width="800px" height="2100px" /> -->
</div>
</div>



</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
 import pdf from 'vue-pdf' // 引入vue-pdf插件
 
export default {
  name: 'Home',
  components: {
    HelloWorld,
    pdf
  },
  data() {
    return {
      src:"用户协议.pdf",
      // pdfUrl: '/用户协议', // PDF文件路径
      currentPage:0, // pdf文件页码
      pageCount:0, // pdf文件总页数
      fileType:'pdf', // 文件类型
      visible:false ,
    }
  },
  created() {
    // this.src =pdf.createLoadingTask(this.src)

  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页

//         changePdfPage (val) {

//             // console.log(val)

//             if (val ===0 &&this.currentPage >1) {

//                 this.currentPage--

//                 // console.log(this.currentPage)

//             }

//             if (val ===1 &&this.currentPage){

//                 this.currentPage++

//                 // console.log(this.currentPage)

//             }

// },
//         // pdf加载时
//         loadPdfHandler (e) {
//             this.currentPage =1 // 加载的时候先加载第一页
//         }
  }
}
</script>
<style>
  .pdf {
    margin:0 auto;
  }

  .main {
    position:relative;
    margin:0 auto;
    width:50%;
    height:800px;
    overflow:scroll;
  }

  .confirm {
    /* position: relative;  */
    /* top: 50%;  */
    /* left: 50%; */
    display: flex;
    justify-content: center; 
    align-items: center;
  }
</style>
