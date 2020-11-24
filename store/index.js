import Vuex from 'vuex'
import menu from './modules/menu'
let store = () => new Vuex.Store({
    modules: {
        menu
    },
    actions: {
        async nuxtServerInit ({ commit }, { req, app }) {
            let menus = await app.$axios.$get("BlogView/GetBlogMenu");
            commit('menu/setMenus', menus)
        }
    }
})
export default store