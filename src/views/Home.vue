<template>
  <div id="app">
    <h1>画像連携アプリサンプル</h1>
    <p class="margin"></p>
    <b-button
      type="button"
      size="lg"
      variant="outline-primary"
      v-on:click="start"
    >開始する</b-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    start() {
      //login画面へ遷移
      this.$router.push("/login");
    }
  }
};
</script>
