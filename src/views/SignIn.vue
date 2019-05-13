<template>
  <div id="app">
    <h1>ログイン画面</h1>
    <ErrMsg/>
    <div>
      <table class="form-table">
        <tr>
          <th><label for="signIn-email">メールアドレス</label></th>
          <td><input type="text" id="signIn-email" placeholder="E-mail" v-model="email"></td>
        </tr>
        <tr>
          <th><label for="signIn-pass">パスワード</label></th>
          <td><input type="text" id="signIn-pass" placeholder="Password" v-model="pass"></td>
        </tr>
      </table>
    </div>
    <div>
      <b-button
        type="button"
        size="lg"
        variant="outline-primary"
        v-on:click="signIn"
      >ログイン</b-button>
    </div>
    <div class="signUp-area">
      <router-link to="/signUp">新規登録はこちらから</router-link>
    </div>
  </div>
</template>

<script>
import ErrMsg from "../components/ErrMsg";
import "../lib/definition/enum.js";
import firebase from "firebase";
import { db } from "../plugins/firebase";

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
    async signIn() {
      //ログイン処理
      await firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });

      //user情報取得
      let querySnapshot = await db.collection('users').where('user_email', '==', this.email).get()
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });
      const userData = querySnapshot.docs.map(doc => {
        return doc.data()
      });

      //wallet情報の取得
      querySnapshot = await db.collection('wallets').where('user_id', '==', userData[0].user_id).get()
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });
      const walletData = querySnapshot.docs.map(doc => {
        return doc.data()
      });
      
      //vuexストアへ保存
      this.$store.commit('signIn', {
        user: userData[0].user_name,
        id: userData[0].user_id,
        type: userData[0].user_type
      });

      this.$store.commit('setWallet', {
        amount: walletData[0].amount
      });
      //index画面へ遷移
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

</style>
