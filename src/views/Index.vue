<template>
  <div id="app">
    <ErrMsg/>
    <div class="user-info-area">
      <div>{{myUser.name}}さんようこそ！！</div>
      <div class="user-info">
        <div class="user-info-amount">残高：{{myWallet.amount}}</div>
        <div><b-button
                type="button"
                size="sm"
                variant="outline-primary"
                v-on:click="signOut"
              >ログアウト</b-button></div>
      </div>
    </div>
    <h1>ユーザ一覧</h1>
    <div>
      <table>
        <thead>
          <tr>
            <th>ユーザ名</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.user_id">
            <td>{{user.user_name}}</td>
            <td>
              <b-button
                type="button"
                size="sm"
                variant="btn btn-info"
                v-on:click="getWallet(user)"
              >walletを見る</b-button>
              <b-button
                type="button"
                size="sm"
                variant="btn btn-info"
                v-on:click="giveMoney(user)"
              >送る</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--sendモーダル-->
    <Modal v-on:close="closeModal" v-if="walletModal">
      <p>{{selectedUser.user_name}}さんの残高</p>
      <div>{{walletAmount}}</div>
    </Modal>
    <!--walletモーダル-->
    <Modal v-on:close="closeModal" v-if="sendModal">
      <div>あなたの残高：{{myWallet.amount}}</div>
      <p>送る金額</p>
      <div>
        <input v-model="sendAmount">
      </div>
      <template slot="footer">
        <b-button type="button" size="sm" variant="btn btn-danger" v-on:click="sendMoney">送信</b-button>
      </template>
    </Modal>
  </div>
</template>

<script>
import ErrMsg from "../components/ErrMsg"
import firebase from "firebase"
import { db } from "../plugins/firebase"
import Modal from "../components/Modal.vue"
import { getData, putData } from '../lib/definition/function.js'

export default {
  name: "App",
  components: {
    ErrMsg,
    firebase,
    Modal
  },
  data() {
    return {
      sendModal: false,
      walletModal: false,
      users: [],
      selectedUser: {},
      sendAmount: null,
      walletAmount: null
    }
  },
  computed: {
    myUser() {
      return this.$store.state.user.user
    },
    myWallet() {
      return this.$store.state.user.wallet
    }
  },
  methods: {
    async giveMoney(user) {
      //モーダルウィンドウを表示
      this.sendModal = true

      //選択されたユーザ情報を保存
      this.selectedUser = user
    },
    async getWallet(user) {
      //モーダルウィンドウを表示
      this.walletModal = true

      //wallet残高の取得
      const walletData = await getData(db, 'wallets', ["user_id", "==", user.user_id])
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err})
      })
      this.walletAmount = walletData[0].amount
    },
    closeModal() {
      //モーダルウィンドウを非表示
      this.sendModal = false
      this.walletModal = false

      //初期化
      this.sendAmount = null
      this.walletAmount = null
      this.selectedUser = {}
    },
    async sendMoney() {
      const senderUserId = this.myUser.id
      const receiverUserId = this.selectedUser.user_id
      const sendAmount = parseInt(this.sendAmount)

      //受け渡す金額が残高より少ない場合
      if (sendAmount < this.myWallet.amount) {
        //wallet残高の取得
        const walletData = await getData(db, 'wallets', ["user_id", "==", receiverUserId])
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err})
        })
        const receiverWalletAmount = walletData[0].amount

        //更新後の値を算出
        const newSenderWalletAmount = this.myWallet.amount - sendAmount
        const newReceiverWalletAmount = receiverWalletAmount + sendAmount

        //受け取り側の更新
        putData(db, 'wallets', ["user_id", "==", receiverUserId], { amount: newReceiverWalletAmount })
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        })

        //受け渡し側の更新
        await putData(db, 'wallets', ["user_id", "==", senderUserId], { amount: newSenderWalletAmount })
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        })

        //wallet情報をセット
        await this.$store.dispatch('getWalletData', senderUserId)
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        })  
      }
      //受け渡す金額が残高より多い場合、文字列が入力された場合など
      else {
        this.$store.commit("setErr", { errMsg: "有効な値を入力してください" })
      }

      //モーダルウィンドウを閉じる
      this.closeModal()
    },
    signOut() {
      //サインアウト処理
      firebase.auth().onAuthStateChanged(async user => {
        //ログイン情報ありの場合のみサインアウト実行
        if(user){
          await firebase.auth().signOut()
          .catch(err => {
            this.$store.commit('setErr', {errMsg: err.message})
          })
        }

        //Vuexストアの更新
        this.$store.commit('init')

        //signIn画面へ遷移
        this.$router.push('/signIn')
      })
    }
  },
  created: function() {
    firebase.auth().onAuthStateChanged(async user => {
      //ログイン情報ありの場合
      if(user){
        const myUserId = user.uid

        //user情報をセット
        await this.$store.dispatch('getUserData', myUserId)
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        })  

        //wallet情報をセット
        await this.$store.dispatch('getWalletData', user.uid)
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        })

        //ユーザ一覧を取得
        const users = await getData(db, 'users')
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        })  
        
        this.users = users.filter(user => myUserId !== user.user_id)
      }
      //ログイン情報なしの場合
      else{
        this.$router.push('/signIn')
      }
    })
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
}
h1 {
  margin-bottom: 20px;
}
.user-info-area {
  margin: 50px 100px;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
}
.user-info{
  display: flex;
}
.user-info-amount{
  margin-right: 20px;
}
</style>
