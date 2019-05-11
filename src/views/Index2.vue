<template>
  <div id="app">
    <h1>US画像</h1>
    <div>
      {{errMsg}}
    </div>
    <div>
      <img src='http://localhost:3030/img/test.png' class="us-image" ref="image">
    </div>
    <div>
      <b-button
        type="button"
        size="lg"
        variant="outline-primary"
        v-on:click="imgGet"
      >更新</b-button>
      <b-button
        type="button"
        size="lg"
        variant="outline-primary"
        v-on:click="imgStore"
      >保存</b-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "firebase/firestore";
import axios from 'axios'

export default {
  name: "App",
  components: {
    firebase
  },
  data() {
    return {
      email: '',
      pass: '',
      errCode: '',
      errMsg: ''
    };
  },
  methods: {
    imgGet(){
      axios.get('./api/getImg')
      .then(res => {
        const imgData = 'data:image/png;base64,' + res.data.data;
        this.$refs.image.src = imgData;
      })
      .catch(err => {
        console.log('エラー：', err);
      })
    },
    imgStore() {
        // ストレージのルートの参照を取得
        const storageRef = firebase.storage().ref();

        //画像フォルダの
        const imageRef = storageRef.child('images/test.png');

        //画像をbase64に変換
        const img = this.$refs.image;
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const base64Img = canvas.toDataURL('image/png');

        imageRef.putString(base64Img, 'data_url')
        .then(function(snapshot) {
            console.log('Uploaded a base64 string!');
            return imageRef.getDownloadURL()
        })
        .then(url => {
            this.$store.commit('imgStore', {imgUrl: url})

            //リザルト画面へ遷移
            this.$router.push('/result');
        });
    }
  }
};
</script>

<style scoped>
.us-image {
}
</style>
