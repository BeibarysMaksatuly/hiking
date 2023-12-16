<template>
  <div class="video_block">
    <video>
      <source
        :src="video_source"
        type='video/mp4; odecs="avc1.42E01E, mp4a.40.2"'
      />
    </video>
    <img @click="openVideo" src="@/assets/images/play.svg" />
  </div>
</template>

<script>
export default {
  props: ["video_source"],
  methods: {
    openVideo() {
      this.$emit("openVideo");
    },
  },
};
</script>

<style lang="scss" scoped>
.video_block {
  position: relative;
  width: 100%;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  img {
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    position: absolute;
    z-index: 11;
    cursor: pointer;
  }
}
</style>