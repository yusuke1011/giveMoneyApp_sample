import { getData } from '../../lib/definition/function.js'
import { db } from "../../plugins/firebase"

const state = {
    user: {},
    wallet: {}
}

const mutations = {
    setUser(state, userData) {
        state.user.id = userData.user_id
        state.user.name = userData.user_name
        state.user.type = userData.user_type
    },
    setWallet(state, walletData) {
        state.wallet.amount = walletData.amount
    },
    init(state) {
        state.user = {}
        state.wallet = {}
    }
}

const actions = {
    async getUserData({commit}, userId) {
        const userData = await getData(db, 'users', ['user_id', "==", userId])
        commit('setUser', userData[0])
    },

    async getWalletData({commit}, userId){
        const walletData = await getData(db, 'wallets', ['user_id', "==", userId])
        commit('setWallet', walletData[0])
    }
}

export default {
    state,
    mutations,
    actions
}