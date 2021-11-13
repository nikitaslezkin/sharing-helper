export default {
    state: {
        order: {
            step: 1,
        },
    },

    mutations: {
        setOrder(state, data = {}) {
            state.order = data;
        },
    },

    actions: {},

    getters: {
        order(state) {
            return state.order ? state.order : false;
        },
    },
};
