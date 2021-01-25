<template>
  <span v-if="item.BlogClassification_Name.length > 0">
    <nuxt-link
      v-for="(personalTag, index) in item.BlogClassification_Name.split(',')"
      :key="item.ID + index"
      class="category-tag"
      :to="`/tags/${personalTag}`"
    >
      <a-tag>{{ personalTag }}</a-tag>
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
