const state = {
    user: ''
}

const mutations = {
    login(state, payload) {
        state.user = payload.user
    },
    signOut(state) {
        state.user = ''
    }
}

export default {
    state,
    mutations
}