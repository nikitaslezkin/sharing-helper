
const state = {
    username: null,
    usertype: null,
    islearn: true,
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
};

export default {
    state,
    getters,
    actions,
    mutations
};


