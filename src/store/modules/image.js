const state = {
    imgUrl: ''
}

const mutations = {
    imgStore(state, payload) {
        state.imgUrl = payload.imgUrl
    }
}

export default {
    state,
    mutations
}