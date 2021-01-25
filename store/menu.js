export const state = () => ({
    menus: []
})

export const mutations = {
    setMenus (state, list) {
        state.menus = list
    }
}
export const actions = {
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
