<template>
  <div id="app">
    <ErrMsg/>
    <div class="user-info-area">
      <div>{{userName}}さんようこそ！！</div>
      <div>残高：{{amount}}</div>
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
          <tr
            v-for="user in users"
            v-bind:key="user.user_id">
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
                v-on:click="giveMoney(user.user_id)"
              >送る</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--モーダルウィンドウ-->
    <Modal v-on:close="closeModal" v-if="walletModal">
      <p>{{selectedUser}}さんの残高</p>
      <div>{{walletAmount}}</div>
    </Modal>
    <Modal v-on:close="closeModal" v-if="sendModal">
      <div>あなたの残高：{{amount}}</div>
      <p>送る金額</p>
      <div><input v-model="sendAmount"></div>
      <template slot="footer">
        <b-button
          type="button"
          size="sm"
          variant="btn btn-danger"
          v-on:click="sendMoney"
        >送信</b-button>
      </template>
    </Modal>
  </div>
</template>

<script>
import ErrMsg from "../components/ErrMsg";
import firebase, { firestore } from "firebase";
import { db } from "../plugins/firebase";
import Modal from '../components/Modal.vue'

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
      selectedUser: '',
      sendAmount: null,
      walletAmount: null
    };
  },
  computed: {
    userName() {
      return this.$store.state.auth.user
    },
    amount() {
      return this.$store.state.wallet.amount
    }
  },
  methods: {
    async giveMoney(userId) {
      //モーダルウィンドウの表示
      this.sendModal = true

      this.selectedUser = userId
    },
    async getWallet(user) {
      //モーダルウィンドウの表示
      this.walletModal = true

      this.selectedUser = user.user_name

      //wallet残高の取得
      const querySnapshot = await db.collection('wallets').where('user_id', '==', user.user_id).get()
      .catch(err => {
        this.$store.commit('setErr', {errMsg: err.message})
      });
      querySnapshot.forEach(doc => {
        this.walletAmount = doc.data().amount;
      })
    },
    closeModal() {
      //モーダルウィンドウを非表示
      this.sendModal = false
      this.walletModal = false

      //初期化
      this.sendAmount = null
      this.walletAmount = null
      this.selectedUser = ''
    },
    async sendMoney() {
      const sendAmount = parseInt(this.sendAmount);
      if(sendAmount < this.amount) {

        let querySnapshot = await db.collection('wallets').where('user_id', '==', this.selectedUser).get()
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        });
        const recieverDocData = querySnapshot.docs.map(doc => {
          return doc
        });
        const recieverDocId = recieverDocData[0].id;

        console.log(recieverDocData[0].id)

        //対象ドキュメントの参照を取得
        const recieverDocRef = db.collection('wallets').doc(recieverDocId)

        await db.runTransaction(async transaction => {
          //対象ドキュメントを取得
          const recieverDoc = await transaction.get(recieverDocRef);
          //指定金額分加算
          console.log(recieverDoc.data())
          const newAmount = recieverDoc.data().amount + sendAmount;
          //更新
          await transaction.update(recieverDocRef, {amount: newAmount});
        });

        const myUserId = this.$store.state.auth.id;

        querySnapshot = await db.collection('wallets').where('user_id', '==', myUserId).get()
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        });
        const senderDocData = querySnapshot.docs.map(doc => {
          return doc
        });
        const senderDocId = senderDocData[0].id;
                console.log(senderDocId)

        //対象ドキュメントの参照を取得
        const senderDocRef = db.collection('wallets').doc(senderDocId)

        await db.runTransaction(async transaction => {
          //対象ドキュメントを取得
          const senderDoc = await transaction.get(senderDocRef);
          //指定金額分加算
          const newAmount = senderDoc.data().amount - sendAmount;
          //更新
          await transaction.update(senderDocRef, {amount: newAmount});
        });

        //wallet情報の取得
        querySnapshot = await db.collection('wallets').where('user_id', '==', myUserId).get()
        .catch(err => {
          this.$store.commit('setErr', {errMsg: err.message})
        });
        const walletData = querySnapshot.docs.map(doc => {
          return doc.data()
        });

        this.$store.commit('setWallet', {
          amount: walletData[0].amount
        });

        this.closeModal()

      }
      else {
        this.$store.commit('setErr', {errMsg: '有効な値を入力してください'})
        this.closeModal()
      }
    }
  },
  created: async function(){
    //DBよりユーザ一覧を取得
    const querySnapshot = await db.collection('users').get()
    .catch(err => {
      this.$store.commit('setErr', {errMsg: err.message})
    });
    this.users = querySnapshot.docs.map(doc => {
      return doc.data();
    });
    this.users.filter(user => {
      return this.userName !== user.user_name;
    });
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px;
}
h1{
  margin-bottom: 20px;
}
.user-info-area{
  margin: 50px 100px;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
}
</style>
