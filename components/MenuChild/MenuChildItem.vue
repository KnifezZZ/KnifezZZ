<template>
  <el-menu-item
    v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    :index="resolvePath(theOnlyOneChild.path)"
  >
    <i
      :class="[theOnlyOneChild.meta.icon || 'el-icon-files']"
      class="i-icon"
    ></i>
    <span v-if="theOnlyOneChild.meta.title">{{
      theOnlyOneChild.meta.title
    }}</span>
  </el-menu-item>
  <el-submenu
    v-else
    :index="resolvePath(item.path)"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <i :class="[item.meta.icon || 'el-icon-files']" class="i-icon"></i>
      <span v-if="item.meta && item.meta.title" slot="title">{{
        item.meta.title
      }}</span>
    </template>
    <template v-if="item.children">
      <menu-child-item
        v-for="child in item.children"
        :key="child.meta.key"
        :item="child"
        :is-collapse="isCollapse"
        :is-first-level="false"
        :base-path="resolvePath(child.path)"
      />
    </template>
  </el-submenu>
</template>
<script>
import path from "path";
export default {
  name: "MenuChildItem",
  props: {
    item: Object,
    isCollapse: { type: Boolean, default: false },
    isFirstLevel: { type: Boolean, default: true },
    basePath: { type: String, default: '' },
  },
  computed: {
    alwaysShowRootMenu: function () {

      if (this.item.meta && this.item.meta.alwaysShow) {
        return true;
      }
      return false;
    },
    showingChildNumber: function () {
      if (this.item.children) {
        const showingChildren = this.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false;
          } else {
            return true;
          }
        });
        return showingChildren.length;
      }
      return 0;
    },
    theOnlyOneChild: function () {
      if (this.showingChildNumber > 1) {
        return null;
      }
      if (this.item.children) {
        for (let child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }
      const { path, name, meta, component } = this.item;
      return {
        path,
        name,
        meta,
        component,
      };
    },
  },
  methods: {
    isExternal (path) {
      return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(path)
    },
    resolvePath (routePath) {
      if (this.isExternal(routePath)) {
        return routePath;
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>