<template>
  <img :src="url" />
</template>

<script>
export default {
  name: "VPoster",
  props: {
    src: {
      type: String | null,
      required: true,
      default: function() {
        return null;
      }
    }
  },
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.url = this.src;
    if (this.src !== null && this.src !== undefined) {
      this.url = "/api/_file/getfile/" + this.src;
    } else {
      this.url = "/images/default-pic-2.jpg";
    }
  }
};
</script>
