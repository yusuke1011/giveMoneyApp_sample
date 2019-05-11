<template>
  <div id="app">
    <h1>新規登録画面</h1>
    <div>
      {{errMsg}}
    </div>
    <div>
      <table class="form-table">
        <tr>
          <th><label for="login-email">メールアドレス</label></th>
          <td><input type="text" id="login-email" placeholder="E-mail" v-model="email"></td>
        </tr>
        <tr>
          <th><label for="login-pass">パスワード</label></th>
          <td><input type="text" id="login-pass" placeholder="Password" v-model="pass"></td>
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
    <div class="signup-area">
      <router-link to="/login">ログインはこちらから</router-link>
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
      email: '',
      pass: '',
      errCode: '',
      errMsg: ''
    };
  },
  methods: {
    signUp() {
      //ユーザ新規登録処理
      firebase.auth().createUserWithEmailAndPassword(this.email, this.pass)
      .then(user => {
        //ログイン画面へ遷移
        this.$router.push("/login");
      })
      .catch(error => {
        //エラー処理
        this.errCode = error.code;
        this.errMsg = error.message;
      });
    }
  }
};
</script>

<style scoped>

</style>