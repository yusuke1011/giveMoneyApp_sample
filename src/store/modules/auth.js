const state = {
    id: '',
    user: '',
    type: 0
}

const mutations = {
    signIn(state, payload) {
        state.id = payload.id;
        state.user = payload.user;
        state.type = payload.type;
    },
    signOut(state) {
        state.id = '';
        state.user = '';
        state.type = 0;
    }
}

export default {
    state,
    mutations
}