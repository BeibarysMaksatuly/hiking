<template>
  <div class="row-1">
    <client-only>
      <div class="row-1Swiper">
        <swiper :pagination="true" class="swiper" :options="swiperOptions">
          <swiper-slide
            v-for="image in tour.images"
            :key="image.id"
            class="mini__photo"
          >
            <img :src="image.image" alt="mini photo" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" />
        </swiper>
        <TourLogo class="row-1__logo" />
      </div>
    </client-only>
    <div class="row-1__data">
      <div class="row-1__title">{{ tour.name }}</div>
      <div class="row-1__subtitle">
        {{ tour.short_description && tour.short_description.slice(0, 110) }}
      </div>
      <div class="row-1__places">
        <div
          class="row-1__place"
          v-for="country in tour.country"
          :key="country.id"
        >
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
      </div>
      <div class="row-1__places">
        <div
          class="row-1__place row-1__place--green"
          v-for="tag in tour.tags"
          :key="tag.id"
        >
          <div class="circle--green"></div>
          <div>{{ tag.name }}</div>
        </div>
      </div>
    </div>
    <div class="mini__info">
      <div class="info__details">
        <div class="info__map">
          <Calendar />
          <div>
            {{ formatDate(tour.earliest_date) }} {{ $t("tours.to") }}
            {{ formatDate(tour.latest_date) }}
          </div>
        </div>
        <div class="info__map">
          <!-- <Map /> -->
          <!-- <div>100 км</div> -->
        </div>
      </div>
      <div class="info__price">
        {{ $t("tours.from") }} {{ tour.lowest_price }}
      </div>
      <UiButton
        class="info__first"
        type="outlined"
        @click.native="$emit('open-modal', tour.id)"
        >{{ $t("tours.information") }}</UiButton
      >
      <UiButton
        @click.native="$router.push(localePath(`/tours/${tour.id}/`))"
        >{{ $t("tours.seeTour") }}</UiButton
      >
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from "swiper";
import Arrow from "icons/btn-left.svg?inline";
import TourLogo from "icons/tour-logo.svg?inline";
import Map from "icons/map.svg?inline";
import Calendar from "icons/calendar.svg?inline";
Swiper.use([Navigation, Pagination]);
export default {
  components: {
    Arrow,
    TourLogo,
    Map,
    Calendar,
  },
  props: {
    tour: {
      type: Object,
      default: () => {},
    },
  },
  name: "row",
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
    };
  },
  methods: {
    formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.row-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background-color: #fff;
  border-radius: 15px;
  gap: 20px;

  @include phone {
    flex-direction: column;
  }

  &__logo {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 111;
  }

  &__data {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    flex: 1;

    @include phone {
      padding-top: 0;
      padding-right: 10px;
      padding-left: 10px;
      margin-top: -10px;
    }
  }

  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 15px;
    @include phone {
      font-size: 14px;
      line-height: 130%;
      margin-bottom: 5px;
    }
  }

  &__subtitle {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 10px;
    @include phone {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 20px;
    }
  }

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    &:last-of-type {
      margin-top: 10px;
    }
  }

  &__place {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;

    padding: 8px 12px;
    gap: 5px;
    border-radius: 10px;
    border: 2px solid rgba(239, 127, 26, 0.6);

    &--green {
      border: 2px solid rgba(40, 167, 69, 0.6) !important;
    }

    @include phone {
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }
  }
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.6);

  &--green {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(40, 167, 69, 0.6);
  }
}

.row-1Swiper {
  position: relative;
  width: 268px;
  height: 381px;
  flex-shrink: 0;
  .swiper {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

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
  background: $c-white;
  opacity: 1;
}

.mini {
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 30px;
    padding-right: 20px;
    padding-bottom: 20px;
    flex: 1;

    margin-top: auto;
    @include phone {
      gap: 20px;
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 10px;
    }
  }
}

.info {
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

  &__price {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #ef7f1a;
    @include phone {
      font-size: 14px;
      font-weight: 400;
      line-height: 130%;
    }
  }

  &__first {
    margin-bottom: -20px;
    @include phone {
      margin-bottom: -10px;
    }
  }
}

.button-outlined,
.button-primary {
  @include phone {
    height: 27px;
    padding: 6px 10px !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 500 !important;
    line-height: normal !important;
  }
}
</style>