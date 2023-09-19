<template>
  <div class="info">
    <UiHeading class="info__title">Туры</UiHeading>
    <div class="info__description">
      <div class="descr__info">Какое-то долгое описание туров. Прям очень долгое описание туров. Сам тур классный</div>
      <div class="descr__icons">
        <Window :class="isGrid && 'descr__icons-active'"/>
        <Slider :class="!isGrid && 'descr__icons-active'"/>
      </div>
    </div>
    <div :class="isGrid ? 'info__data' : 'info__data-row'">
      <template v-if="isGrid">
        <ToursMini v-for="tour in tours" :key="tour.id" />
      </template>
    </div>
  </div>
</template>
<script>
import Window from '@/assets/icons/window.svg?inline';
import Slider from '@/assets/icons/slider.svg?inline';
export default {
  components: {
    Window,
    Slider
  },
  data() {
    return {
      isGrid: true,
    }
  }
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  &__title {
    margin-bottom: 30px;
  }
  &__description {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
}

.descr {
  &__info {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    flex: 1;
  }
  &__icons {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 30px;
    svg {
      width: 20px;
      height: 20px;
    }
    &-active {
      color: $c-orange !important;
    }
  }
}
</style>