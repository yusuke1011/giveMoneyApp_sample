const state = {
    errMsg: ''
}

const mutations = {
    setErr(state, payload) {
        state.errMsg = payload.errMsg
    }
}

export default {
    state,
    mutations
}