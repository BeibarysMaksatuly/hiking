<template>
  <div class="pop-up">
    <client-only>
      <div class="modal-mask" @click="closeVideo">
        <div class="video_wrapper" @mousemove="play" @mouseleave="leave">
          <video autoplay controls>
            <source
              :src="video_source"
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            />
          </video>
          <img
            id="close_btn"
            @click="closeVideo"
            class="play"
            :style="{ top: playY + 'px', left: playX + 'px' }"
            src="@/assets/images/elipse.svg"
          />
        </div>
      </div>
    </client-only>
  </div>
</template>


<script>
export default {
  name: "pop-up",
  props: ["video_source"],
  data: () => ({
    playX: null,
    playY: null,
  }),
  methods: {
    play(e) {
      const videoWrapper = this.$el.querySelector(".video_wrapper");
      const video = videoWrapper.querySelector("video");
      const img = document.getElementById("close_btn");

      const rect = video.getBoundingClientRect();
      const bottomAreaHeight = 60;
      const isInControlArea = e.clientY > rect.bottom - bottomAreaHeight;

      img.style.display = "block";

      if (isInControlArea) {
        img.style.display = "none";
      } else {
        this.playX = e.clientX;
        this.playY = e.clientY;
      }
    },
    leave(e) {
      const img = document.getElementById("close_btn");
      img.style.display = "none";
      this.playX = e.clientX;
      this.playY = e.clientY;
    },
    closeVideo() {
      this.$emit("closeVideo");
    },
  },
};
</script>

<style lang="scss" scoped>
.pop-up {
  width: 100%;
  overflow: hidden;
  .modal-mask {
    position: fixed;
    z-index: 1000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    .video_wrapper {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      video {
        width: 100%;
        max-width: 100%;
        max-height: 90vh;
      }
      .play {
        position: absolute;
        transform: translate(-50%, -50%);
        transition-duration: 100ms;
        transition-timing-function: linear;
        transition: 0.1s infinite alternate;
        pointer-events: none;
        left: -500px;
        top: -500px;
        right: -500px;
        bottom: -500px;
        z-index: -1;
      }
    }
  }
}
</style>
