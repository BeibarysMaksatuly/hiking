<template>
  <div class="info">
    <UiHeading class="info__title">{{ $t("header.tours") }}</UiHeading>
    <div class="info__description">
      <div class="descr__info">{{ $t("tours.toursDescription") }}</div>
      <div class="descr__icons">
        <Window :class="isGrid && 'descr__icons-active'" @click="isGrid=true"/>
        <Slider :class="!isGrid && 'descr__icons-active'" @click="isGrid=false"/>
      </div>
    </div>
    <div :class="isGrid ? 'info__data' : 'info__data-row'">
      <template v-if="isGrid">
        <ToursMini 
          v-for="tour in tours" 
          :key="tour.id" 
          :tour="tour" 
          @open-modal="openModal" />
      </template>
      <template v-else>
        <ToursRow 
          v-for="tour in tours" 
          :key="tour.id" 
          :tour="tour" 
          @open-modal="openModal"
        />
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
  props: {
    tours: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isGrid: true,
    }
  }, 
  methods: {
    openModal(id) {
      this.$emit('open-modal', id)
    }
   },
  watch: {
    isGrid: {
      handler(val) {
        this.$emit('change', val ? 9 : 3)
      }
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

  &__data {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;

    @include phone {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 10px;
      row-gap: 30px;
    }

    &-row {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
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
    cursor: pointer;
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