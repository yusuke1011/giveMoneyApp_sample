const state = {
    errMsg: ''
}

const mutations = {
    setErr(state, payload) {
        state.errMsg = payload.errMsg
    },

    initErr(state) {
        state.errMsg = ''
    }
}

export default {
    state,
    mutations
}