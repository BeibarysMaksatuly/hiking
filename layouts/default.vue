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
    <SharedFooter />
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      isMobileHeaderOpen: false,
      isLangModalOpen: false,
    };
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
  },
  computed: {
    isMainPage() {
      return this.$route.name.includes("index");
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
  line-height: 1;
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
</style>