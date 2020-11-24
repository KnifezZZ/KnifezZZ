<template>
  <div>
    <div class="menu-wrap">
      <nav class="menu">
        <div class="menu-head">
          <el-avatar
            :size="100"
            :src="require('static/images/logo.svg')"
          ></el-avatar>
          <p>热爱游戏享受编程的.Net程序员</p>
          <p>
            <el-tag type="info">
              <i class="el-icon-notebook-1" />
              文章数：{{ blogCount }}
            </el-tag>
            <el-tag type="info">
              <i class="el-icon-view" />
              访问量：{{ visitCount }}
            </el-tag>
          </p>
        </div>
        <el-menu
          class="blog-menu"
          mode="vertical"
          @select="handleSelect"
          background-color="rgba(0, 0, 0, 0)"
          text-color="#fff"
          active-text-color="#1890ff"
        >
          <menu-child-item
            v-for="(route, index) in menus"
            :key="route.meta.key"
            :item="route"
            :base-path="route.path || index + ''"
          />
          <el-menu-item index="/admin/#/" style="color: #92cffe">
            <i class="i-icon el-icon-setting"></i>
            <span slot="title">后台管理</span>
          </el-menu-item>
        </el-menu>
      </nav>
      <button class="close-button" @click="menuClick">Close Menu</button>
      <div
        class="morph-shape"
        id="morph-shape"
        data-morph-open="M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
        >
          <path
            d="M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z"
          />
        </svg>
      </div>
    </div>
    <img
      @click="menuClick"
      :src="require('static/images/menu-logo.png')"
      class="head-icon"
    />
  </div>
</template>
<script>
import MenuChildItem from "./MenuChild/MenuChildItem.vue";
import "../assets/styles/menus/menu.css"
if (process.client) {
  var Snap = require("snapsvg-cjs")
}
export default {
  name: "HeaderBar",
  data () {
    return {
      isOpen: false,
      info: {},
    }
  },
  computed: {
    blogCount: function () {
      return this.info.BlogCount;
    },
    visitCount: function () {
      return this.info.VisitCount;
    },
    menus: function () {
      return this.converTree(this.$store.state.menu.menus);
    }

  },
  methods: {
    converTree (list) {
      const getChilders = (pid, children = []) => {
        list.filter(function (ele) {
          return ele.ParentId == pid
        }).map((item) => {
          if (item.Url !== "/") {
            const itemChild = getChilders(item.Id, item.children);
            children.push({
              path: item.Url,
              name: item.Text,
              meta: {
                key: item.id,
                icon: item.Icon,
                title: item.Text,
              },
              children: itemChild,
            });
          }
        });
        return children;
      };
      const tree = getChilders("", []);
      return tree;
    },
    getAuthorInfo () {
      this.$axios.$get("BlogView/GetAuthorInfo?user=''").then(res => {
        this.info = res
      })
    },
    handleSelect (key, keypath) {
      if (key === '/admin/#/') {
        location.href = key;
      }
      let path = keypath.join('_').replace('_/', '_');
      this["$router"].push({
        path: path,
      });

      this.menuClick();
    },
    menuClick () {
      var bodyEl = document.body;
      var content = document.querySelector(".el-main");
      var morphEl = document.getElementById("morph-shape");
      var s = Snap(morphEl.querySelector("svg"));
      var path = s.select("path");
      var initialPath = path.attr("d");
      var steps = morphEl.getAttribute("data-morph-open").split(";");
      var stepsTotal = steps.length;
      var isAnimating = false;
      if (isAnimating) return false;
      isAnimating = true;
      if (this.isOpen) {
        bodyEl.setAttribute("class", "");
        // animate path
        setTimeout(function () {
          // reset path
          path.attr("d", initialPath);
          isAnimating = false;
        }, 300);
      } else {
        bodyEl.setAttribute("class", "show-menu");
        // animate path
        var pos = 0,
          nextStep = function (pos) {
            if (pos > stepsTotal - 1) {
              isAnimating = false;
              return;
            }
            path.animate(
              { path: steps[pos] },
              pos === 0 ? 400 : 500,
              pos === 0 ? mina.easein : mina.elastic,
              function () {
                nextStep(pos);
              }
            );
            pos++;
          };

        nextStep(pos);
      }
      this.isOpen = !this.isOpen;
    },
  },
  mounted () {
    this.getAuthorInfo();

  },
};
</script>
<style scoped>
.blog-menu {
  border-right: 0px;
}
</style>