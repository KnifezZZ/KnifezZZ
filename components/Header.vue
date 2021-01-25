<template>
  <div>
    <img :src="require('static/images/menu-logo.png')" class="head-icon" />
    <template v-if="isMobile">
      <a-dropdown class="head-menu" placement="bottomRight">
        <a-button><v-icon icon="menu"></v-icon></a-button>
        <a-menu slot="overlay" v-model="current" mode="horizontal">
          <v-menu v-for="route in menus" :key="route.path" :item="route" />
        </a-menu>
      </a-dropdown>
    </template>
    <template v-else>
      <a-menu class="head-menu" v-model="current" mode="horizontal">
        <v-menu v-for="route in menus" :key="route.path" :item="route" />
      </a-menu>
    </template>
  </div>
</template>
<script>
import VIcon from './VIcon.vue'
import VMenu from './v-menu/index'
export default {
  components: { VIcon },
  name: 'Header',
  data() {
    return {
      current: ['menu'],
    }
  },
  props: {
    isMobile: false,
  },
  computed: {
    menus: function () {
      return this.converTree(this.$store.state.menu.menus)
    },
  },
  methods: {
    converTree(list) {
      const getChilders = (pid, children = []) => {
        list
          .filter(function (ele) {
            return ele.ParentId == pid
          })
          .map((item) => {
            if (item.Url !== '/') {
              const itemChild = getChilders(item.Id, item.children)
              children.push({
                path: item.Url,
                name: item.Name,
                meta: {
                  key: item.id,
                  icon: item.Icon,
                  title: item.Name,
                },
                children: itemChild,
              })
            }
          })
        return children
      }
      const tree = getChilders(null, [])
      return tree
    },
    getAuthorInfo() {
      this.$axios.$get("BlogView/GetAuthorInfo?user=''").then((res) => {
        this.info = res
      })
    },
  },
  mounted() {},
}
</script>
