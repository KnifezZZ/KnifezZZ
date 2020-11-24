<template>
  <span v-if="item.Personal_Class.length > 0">
    <nuxt-link
      v-for="(personalTag, index) in item.Personal_Class.split(',')"
      :key="item.ID + index"
      class="ptag"
      :to="`/tags/${personalTag}`"
    >
      <el-tag size="large" effect="plain">{{ personalTag }}</el-tag>
    </nuxt-link>
  </span>
</template>

<script>
export default {
  name: "ListTag",
  props: {
    item: Object
  }

}
</script>

<style>
</style>