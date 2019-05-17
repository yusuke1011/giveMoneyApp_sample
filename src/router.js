import Vue from 'vue'
import VueRouter from 'vue-router'

//ルート用のcomponent
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Index from '@/views/Index.vue'

//プラグインとして登録
Vue.use(VueRouter)

//VueRouterインスタンスを生成
const router = new VueRouter({
  //#を消す
  mode: 'history',
  //ルーティングの定義
  routes: [
    { path: '/', component: Index },
    { path: '/signIn', component: SignIn },
    { path: '/signUp', component: SignUp }
  ]
})

const app = new Vue({
    router
}).$mount('#app')

export default router

