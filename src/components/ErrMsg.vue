<template>
  <div id="app">
    <div class="err-msg-area">{{errMsg}}</div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
      errMsg(){
          return this.$store.state.error.errMsg;
      }
  }
};
</script>

<style>
.err-msg-area {
  color: red
}
</style>