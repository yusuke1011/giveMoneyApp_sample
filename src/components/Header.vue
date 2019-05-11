<template>
  <div id="app">
    <img src="../assets/logo.png" width="100px" class="logo" v-on:click="toHome">
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toHome() {
      this.$router.push("/");
    }
  }
};
</script>


<style>
.header {
  font-size: 1.3em;
  text-align: left;
  background-color: rgb(7, 76, 116);
  color: #fff;
}
.logo {
  position: relative;
  left: 1px;
  width: 150px;
}
img.logo:hover {
  opacity: 0.5;
  cursor: pointer;
}
img.logo:active {
  position: relative;
  top: 3px;
}
</style>


