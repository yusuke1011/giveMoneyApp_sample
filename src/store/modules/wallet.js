const state = {
    amount: ''
}

const mutations = {
    setWallet(state, payload) {
        state.amount = payload.amount
    }
}

export default {
    state,
    mutations
}