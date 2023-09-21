<template>
  <div class="bread">
    <div class="bread__header">
      <div class="bread__title"><slot name="title"></slot></div>
      <Chevron class="bread__svg" @click.native="isOpen = !isOpen" />
    </div>
    <div class="bread__data" v-if="isOpen">
      <slot name="data" />
    </div>
  </div>
</template>
<script>
import Chevron from '@/assets/icons/chevron-down.svg?inline';
export default {
  components: {
    Chevron
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
<style lang="scss" scoped>
.bread {
  &__header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 28.8px */
    letter-spacing: 0.072px;
  }
  &__data {
    margin-top: 21px;
  }
}
</style>