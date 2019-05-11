<template>
  <div id="app">
    <h1>ログイン画面</h1>
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
        v-on:click="login"
      >ログイン</b-button>
    </div>
    <div class="signup-area">
      <router-link to="/signup">新規登録はこちらから</router-link>
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
    login() {
      console.log(this.$store.state.auth.user)
      //ログイン処理
      firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
      .then(loginUser => {
        this.$store.commit('login', {user: loginUser})
        console.log(this.$store.state.auth.user)

        //index画面へ遷移
        this.$router.push('/index');
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
