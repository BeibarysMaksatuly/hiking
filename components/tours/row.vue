<template>
  <div class="row-1">
    <client-only>
      <swiper :pagination="true"  class="row-1Swiper" :options="swiperOptions">
        <swiper-slide v-for="image in tour.images" :key="image.id" class="mini__photo">
          <img :src="image.image" alt="mini photo" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" />
        <TourLogo class="row-1__logo"/>
      </swiper>
    </client-only>
    <div class="row-1__data">
      <div class="row-1__title">{{ tour.name }}</div>
      <div class="row-1__subtitle">{{ tour.short_description && tour.short_description.slice(0, 110) }}</div>
      <div class="row-1__places">
        <div class="row-1__place" v-for="country in tour.country" :key="country.id">
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
      </div>
      <div class="row-1__places">
        <div class="row-1__place row-1__place--green" v-for="tag in tour.tags" :key="tag.id">
          <div class="circle--green"></div>
          <div>{{ tag.name }}</div>
        </div>
      </div>
    </div>
    <div class="mini__info">
      <div class="info__details">
        <div class="info__map">
          <Calendar />
          <div>С {{ tour.earliest_date }} {{ $t("tours.to") }} {{ tour.latest_date }}</div>
        </div>
        <div class="info__map">
          <!-- <Map /> -->
          <!-- <div>100 км</div> -->
        </div>
      </div>
      <div class="info__price">{{ $t("tours.from") }} {{ tour.lowest_price }}</div>
      <UiButton 
        class="info__first" 
        type="outlined"
        @click.native="$emit('open-modal', tour.id)"
      >{{ $t("tours.information") }}</UiButton>
      <UiButton
        @click.native="$router.push(localePath(`/tours/${tour.id}/`))"
      >{{ $t("tours.seeTour") }}</UiButton>
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
  props: {
    tour: {
      type: Object,
      default: () => {}
    }
  },
  name: 'row',
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
.row-1 {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  @include phone {
    flex-direction: column;
  }

  &__logo {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__data {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
    flex: 1;

    @include phone {
      padding-right: 10px;
      padding-left: 10px;
    }
  }

  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @include phone {
      margin-top: -10px;
      font-size: 14px;
      line-height: 130%;
    }
  }

  &__subtitle {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    @include phone {
      margin-top: -15px;
      font-size: 12px;
      line-height: 15px;
    }
  }

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__place  {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 10px;
    border: 2px solid rgba(239, 127, 26, 0.60);

    &--green {
      border: 2px solid  rgba(40, 167, 69, 0.60) !important;
    }

    @include phone {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
    }
  }

}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.60);

  &--green {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(40, 167, 69, 0.60);
  }
}
.row-1Swiper {
  position: relative;
  width: 268px;
  height: 381px;
  flex-shrink: 0;
  @include phone {
    width: 100%;
    height: 140px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px; 
  }
}
:deep(.swiper-pagination) {
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: $c-white ;
  opacity: 1;
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
      @include phone {
        height: 140px;
      }
    }
  }

  &__info {
    margin-top: auto;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    padding-right: 20px;
    padding-bottom: 12px;
    flex: 1;

    @include phone {
      gap: 20px;
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
    }
  }
}

.info {

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

  &__first {
    margin-bottom: -20px;
    @include phone {
      margin-bottom: -10px;
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

.button-outlined, .button-primary {
  @include phone {
    padding: 6px 10px !important;
    font-size: 12px !important;
  }

}
</style>