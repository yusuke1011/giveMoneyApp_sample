<template>
  <div id="app">
    <h1>新規登録画面</h1>
    <ErrMsg/>
    <div>
      <table class="form-table">
        <tr>
          <th><label for="signUp-email">ユーザ名</label></th>
          <td><input type="text" id="signUp-email" placeholder="userName" v-model="user"></td>
        </tr>
        <tr>
          <th><label for="signUp-email">メールアドレス</label></th>
          <td><input type="text" id="signUp-email" placeholder="E-mail" v-model="email"></td>
        </tr>
        <tr>
          <th><label for="signUp-pass">パスワード</label></th>
          <td><input type="text" id="signUp-pass" placeholder="Password" v-model="pass"></td>
        </tr>
      </table>
    </div>
    <div>
      <b-button
        type="button"
        size="lg"
        variant="outline-primary"
        v-on:click="signUp"
      >新規登録</b-button>
    </div>
    <div class="signUp-area">
      <router-link to="/signIn">ログインはこちらから</router-link>
    </div>
  </div>
</template>

<script>
import ErrMsg from "../components/ErrMsg";
import firebase from "firebase";
import { db } from "../plugins/firebase";
import { USER_TYPE, DEFAULT_AMOUNT } from '../lib/definition/enum.js';

export default {
  name: "App",
  components: {
    ErrMsg,
    firebase
  },
  data() {
    return {
      user: '',
      email: '',
      pass: ''
    };
  },
  methods: {
    async signUp() {
      //ユーザ新規登録処理
      const userData = await firebase.auth().createUserWithEmailAndPassword(this.email, this.pass)
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });
      
      //userの生成
      db.collection("users").add({
        user_id: userData.uid,
        user_name: this.user,
        user_email: this.email,
        user_type: USER_TYPE.GENERAL,
      })
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });

      //walletの生成
      db.collection("wallets").add({
        user_id: userData.uid,
        amount: DEFAULT_AMOUNT
      })
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });

      //index画面へ遷移
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

</style>
