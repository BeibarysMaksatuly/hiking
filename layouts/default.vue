<template>
  <v-app class="default">
    <SharedHeader @open-mobile="openMobileHeader" :isMain="isMainPage" />
    <transition name="slide-fade" mode="out-in">
      <SharedMobileHeader
        v-if="isMobileHeaderOpen"
        @close-mobile="closeMobileHeader"
        @open-lang-modal="openLangModal"
      />
      <SharedModalsLangModal
        v-if="isLangModalOpen"
        @close-modal-lang="closeLangModal"
      />
    </transition>
    <Nuxt class="nuxt" />
    <svg
      v-show="isButtonVisible"
      @click="scrollToTop"
      class="scroll-to-top"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" rx="25" fill="white" />
      <path
        d="M25 15C25.3315 15 25.6495 15.1317 25.8839 15.3661L33.3839 22.8661C33.872 23.3543 33.872 24.1457 33.3839 24.6339C32.8957 25.122 32.1043 25.122 31.6161 24.6339L26.25 19.2678L26.25 33.75C26.25 34.4404 25.6904 35 25 35C24.3096 35 23.75 34.4404 23.75 33.75L23.75 19.2678L18.3839 24.6339C17.8957 25.122 17.1043 25.122 16.6161 24.6339C16.128 24.1457 16.128 23.3543 16.6161 22.8661L24.1161 15.3661C24.3505 15.1317 24.6685 15 25 15Z"
        fill="#FFC107"
      />
    </svg>
    <SharedFooter />
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      isMobileHeaderOpen: false,
      isLangModalOpen: false,
      isButtonVisible: false,
    };
  },
  computed: {
    isMainPage() {
      return this.$route.name.includes("index");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    openMobileHeader() {
      this.isMobileHeaderOpen = true;
    },
    closeMobileHeader() {
      this.isMobileHeaderOpen = false;
    },
    openLangModal() {
      this.isMobileHeaderOpen = false;
      this.isLangModalOpen = true;
    },
    closeLangModal() {
      this.isLangModalOpen = false;
    },
    handleScroll() {
      this.isButtonVisible = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/layout.scss";
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: #fecc01 !important;
}
.swiper-pagination-progressbar {
  background: #e8e8e8 !important;
}

.v-application p {
  margin: 0px;
  padding: 0px;
  line-height: initial;
}
.v-application a {
  color: unset;
}
.v-select__selection {
  max-width: 100%;
}
.v-application .primary--text {
  color: #324552 !important;
}
.v-application .info {
  background-color: initial !important;
  border-color: initial !important;
}

.scroll-to-top {
  position: fixed;
  z-index: 1111;
  bottom: 30px;
  right: 150px;
	filter: drop-shadow(0px 5px 15px rgba(105, 112, 117));
	-webkit-filter: drop-shadow(0px 5px 15px rgba(105, 112, 117));
  border-radius: 50%;
  cursor: pointer;
  path,
  rect {
    transition: all 0.3s ease;
  }
  &:hover {
    rect {
      fill: #ffc107;
    }
    path {
      fill: white;
    }
  }
  @include phone {
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
  }
}
</style>