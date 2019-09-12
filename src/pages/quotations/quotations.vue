<template>
<div>
  <div class="containue-cj">
    <quotationchart/>
    <quotationslist/>
  </div>
</div>
</template>

<script>

import quotationchart from "./quotationchart.vue"
import quotationslist from "./quotationslist.vue"
export default {
  name: 'quotations',
  data () {
    return {
    }
  },
  components:{quotationchart,quotationslist}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
