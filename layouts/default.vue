<template>
    <div class="default" data-app>
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
    </div>
</template>
<script>
export default {
  data() {
    return {
      isMobileHeaderOpen: false,
      isLangModalOpen: false
    }
  },
  methods: {
    openMobileHeader() {
      this.isMobileHeaderOpen = true
    },
    closeMobileHeader() {
      this.isMobileHeaderOpen = false
    },
    openLangModal() {
      this.isMobileHeaderOpen = false
      this.isLangModalOpen = true
    },
    closeLangModal() {
      this.isLangModalOpen = false
    }
  },
  computed: {
    isMainPage() {
      return this.$route.name.includes("index")
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/layout.scss";
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>