<template>
  <div id="app">
    <h1>US画像</h1>
    <div>{{errMsg}}</div>
    <div>
      <img src="../assets/logo.png" class="us-image" ref="image">
    </div>
    <div>
      <b-button type="button" size="lg" variant="outline-primary" v-on:click="imgGet">更新</b-button>
    </div>
    <div>
      <label for="user-name">ユーザ名</label>
      <input type="text" id="user-name" v-model="userName">
      <b-button type="button" size="lg" variant="outline-primary" v-on:click="imgStore">保存</b-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
import { db } from "../plugins/firebase";

export default {
  name: "App",
  components: {
    firebase
  },
  data() {
    return {
      email: "",
      pass: "",
      errCode: "",
      errMsg: "",
      userName: ''
    };
  },
  methods: {
    imgGet() {
      db.collection('users').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
        })
      })
    },
    imgStore() {
     
    }
  }
};
</script>

<style scoped>
.us-image {
}
</style>
