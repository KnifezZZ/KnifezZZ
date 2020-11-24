const state = () => ({
    menus: []
})

const mutations = {
    setMenus (state, list) {
        state.menus = list
    }
}
const actions = {
    getMenus ({ commit }, val) {
        commit("setMenus", val);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}