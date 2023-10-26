<template>
    <div class="default" data-app>
      <SharedHeader @open-mobile="openMobileHeader" :isMain="isMainPage" />
      <SharedMobileHeader v-if="isMobileHeaderOpen" @close-mobile="closeMobileHeader" />
      <Nuxt class="nuxt" />
      <SharedFooter />
    </div>
</template>
<script>
export default {
  data() {
    return {
      isMobileHeaderOpen: false
    }
  },
  methods: {
    openMobileHeader() {
      this.isMobileHeaderOpen = true
    },
    closeMobileHeader() {
      this.isMobileHeaderOpen = false
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
</style>