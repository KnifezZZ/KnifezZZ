export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    let menus = await app.$axios.$get("BlogView/GetBlogMenu");
    commit("menu/setMenus", menus);
  }
};
