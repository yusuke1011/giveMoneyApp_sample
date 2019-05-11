<template>
  <div id="app">
    <h1>保存しました</h1>
    <div>
      {{errMsg}}
    </div>
    <div>
      <qriously v-bind:value="imgUrl" :size="200"/>
    </div>
    <div>
      <b-button
        type="button"
        size="lg"
        variant="outline-primary"
        v-on:click="back"
      >戻る</b-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "App",
  components: {
    firebase
  },
  data() {
    return {
      imgUrl: ''
    };
  },
  methods: {
    back() {
        //インデックス画面へ遷移
        this.$router.push("/index");
    }
  },
  created: function(){
      console.log(this.$refs.qr)
      this.imgUrl = this.$store.state.image.imgUrl;
  }
};
</script>

<style scoped>
.us-image {
}
</style>
