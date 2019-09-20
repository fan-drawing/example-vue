<template>
 <el-container>
    <el-header height="56px" class="header-top">
      <headerMain/>
    </el-header>
    <el-main class="bgcolor">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import headerMain from "@/components/header/headerMain.vue"
export default {
  name: 'index',
  components:{headerMain},
  data () {
    
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
