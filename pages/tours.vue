<template>
  <div class="tours">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <div class="tours__data">
        <ToursFilter />
        <ToursInfo />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    links() {
      return [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Туры',
          url: '/tours'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.tours {
  background-color: #F8FAFB;
  &__data {
    width: 100%;
    display: flex;
    gap: 24px;
  }
} 
.container-1 {
  padding-bottom: 71px;
}
</style>