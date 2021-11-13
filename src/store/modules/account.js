
const state = {
    username: null,
    usertype: null,
    islearn: true,
    lol: 0
};

const getters = {
    username(state) {
        return state.username;
    },

    usertype(state) {
        return state.usertype;
    },

    islearn(state) {
        return state.islearn;
    },

    lol(state) {
        return state.lol;
    },
};

const actions = {
};

const mutations = {
    setUsername(state, username) {
        state.username = username;
    },

    setUsertype(state, usertype) {
        state.usertype = usertype;
    },

    setIslearn(state, islearn) {
        state.islearn = islearn;
    },

    setLol(state, lol) {
        state.lol = lol;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};


