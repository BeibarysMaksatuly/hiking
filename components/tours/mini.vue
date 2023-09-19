<template>
  <div class="mini">
    <client-only>
      <swiper :pagination="true"  class="miniSwiper" :options="swiperOptions">
        <swiper-slide v-for="i in 3" :key="i" class="mini__photo">
          <img src="@/assets/images/mini.png" alt="mini photo" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" />
      </swiper>
    </client-only>
    <TourLogo class="mini__logo"/>
    <div class="mini__info">
      <div class="info__title">Восхождение на Эльбус с юга</div>
      <div class="info__price">От 35 000 ₽</div>
      <div class="info__details">
        <div class="info__map">
          <Calendar />
          <div>С 1 по 15 июня</div>
        </div>
        <div class="info__map">
          <Map />
          <div>100 км</div>
        </div>
      </div>
      <UiButton type="outlined">Краткая информация</UiButton>
      <UiButton>Просмотреть тур</UiButton>
    </div>
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination } from 'swiper';
import Arrow from 'icons/btn-left.svg?inline';
import TourLogo from 'icons/tour-logo.svg?inline';
import Map from 'icons/map.svg?inline';
import Calendar from 'icons/calendar.svg?inline';
Swiper.use([Navigation, Pagination])
export default {
  components: {
    Arrow, TourLogo, Map, Calendar
  },
  name: 'Mini',
  data() {
    return {
      photos: [],
      swiperOptions: {
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.info {
  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: -8px;
    @include phone {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: -10px;
    }
  }

  &__price {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: $c-yellow;
    @include phone {
      font-size: 12px;
      font-weight: 600;
    }
  }
  &__details {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include phone {
      flex-direction: column;
      gap: 5px;
      align-items: flex-start;
    }
  }

  &__map {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    svg {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      color: $c-main;
    }
  }
}
.mini {
  position: relative;
  height: max-content;
  height: 433px;
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.10);
  border-radius: 10px;

  &__logo {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__photo {
    width: 100%;
    img {
      width: 100%;
      object-fit: cover;
      border-radius: 15px; 
    }
  }

  &__info {
    display: flex;
    width: 100%;
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    border-radius: 10px;
    background-color: #F9F9F9;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
}

.button-outlined, .button-primary {
  padding: 6px 10px !important;
  font-size: 12px !important;
}
.miniSwiper {
}
:deep(.swiper-pagination) {
  bottom: auto;
  top: 48%;
  transform: translateY(-48%);

  @include phone {
    top: 58%;
    transform: translateY(-58%);
  }
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white ;
  opacity: 1;
}
</style>