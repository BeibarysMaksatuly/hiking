<template>
  <div class="mini">
    <client-only>
      <swiper :pagination="true" class="miniSwiper" :options="swiperOptions">
        <swiper-slide
          v-for="image in tour.images"
          :key="image.id"
          class="mini__photo"
        >
          <img :src="image.image" alt="mini photo" />
        </swiper-slide>
        <div slot="button-prev" class="swiper-button-prev">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#DDE1E6" fill-opacity="0.2" />
            <path
              d="M13.8047 7.52876C14.0651 7.78911 14.0651 8.21122 13.8047 8.47157L10.2761 12.0002L13.8047 15.5288C14.0651 15.7891 14.0651 16.2112 13.8047 16.4716C13.5444 16.7319 13.1223 16.7319 12.8619 16.4716L8.86193 12.4716C8.60158 12.2112 8.60158 11.7891 8.86193 11.5288L12.8619 7.52876C13.1223 7.26841 13.5444 7.26841 13.8047 7.52876Z"
              fill="white"
            />
          </svg>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
        <div slot="button-next" class="swiper-button-next">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="12"
              transform="matrix(-1 0 0 1 24 0)"
              fill="#DDE1E6"
              fill-opacity="0.2"
            />
            <path
              d="M10.1953 16.4712C9.93491 16.2109 9.93491 15.7888 10.1953 15.5284L13.7239 11.9998L10.1953 8.47124C9.93491 8.21089 9.93491 7.78878 10.1953 7.52843C10.4556 7.26808 10.8777 7.26808 11.1381 7.52843L15.1381 11.5284C15.3984 11.7888 15.3984 12.2109 15.1381 12.4712L11.1381 16.4712C10.8777 16.7316 10.4556 16.7316 10.1953 16.4712Z"
              fill="white"
            />
          </svg>
        </div>
      </swiper>
    </client-only>
    <div class="mini__info">
      <div class="info__title">{{ tour.name }}</div>
      <div class="info__price">
        {{ $t("tours.from") }} {{ tour.lowest_price }}
      </div>
      <div class="info__details">
        <v-tooltip bottom v-model="show">
          <template v-slot:activator="{}">
            <div
              class="info__map"
              @click="show = !show"
              v-click-outside="hideShow"
            >
              <Calendar />
              <div>Посмотреть даты</div>
            </div>
          </template>
          <ul>
            <li v-for="date in tour.dates" :key="date.id">
              {{ formatDate(date.start_date) }} -
              {{ formatDate(date.end_date) }}
            </li>
          </ul>
        </v-tooltip>
        <div class="info__map" v-if="tour.distance">
          <Map />
          <div>{{ tour.distance }} км</div>
        </div>
      </div>
      <UiButton
        class="info__first"
        type="outlined"
        @click.native="$emit('open-modal', tour.id)"
      >
        {{ $t("tours.information") }}
      </UiButton>
      <UiButton
        @click.native="$router.push(localePath(`/tours/${tour.id}/`))"
        >{{ $t("tours.seeTour") }}</UiButton
      >
    </div>
  </div>
</template>

<script>
import Arrow from "icons/btn-left.svg?inline";
import Map from "icons/map.svg?inline";
import Calendar from "icons/calendar.svg?inline";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
import vClickOutside from "v-click-outside";
export default {
  name: "Mini",
  props: {
    tour: {
      type: Object,
      default: () => {},
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Arrow,
    Map,
    Calendar,
  },
  data() {
    return {
      photos: [],
      swiperOptions: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
      show: false,
    };
  },
  methods: {
    hideShow() {
      this.show = false;
    },
    formatDate(dateString) {
      const locale = this.$i18n.locale; // Получение текущей локали
      const options = { month: "short", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, options);
    },
  },
};
</script>

<style lang="scss" scoped>
.mini {
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);
  border-radius: 15px 15px 0 0;
  background: #fff;

  &__photo {
    width: 100%;
    height: 247px;
    border-radius: 15px 15px 0 0;
    @include phone {
      height: 155px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    position: relative;
    z-index: 111;

    width: 100%;
    display: flex;
    flex-direction: column;

    padding: 16px;
    border-radius: 12px 12px 0px 0px;
    background: #fff;
    margin-top: -26px;
    @include phone {
      padding: 8px;
      margin-top: -15px;
      border-radius: 10px 10px 0px 0px;
    }
  }
}
.info {
  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 7px;
    @include phone {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
    }
  }

  &__price {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #ef7f1a;
    margin-bottom: 29px;
    @include phone {
      font-size: 12px;
      margin-bottom: 15px;
    }
  }
  &__details {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 21px;
    @include phone {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
  }

  &__first {
    margin-bottom: 10px;
  }

  &__map {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    &:first-child {
      text-decoration-line: underline;
    }
    svg {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      color: $c-main;
    }
  }
}

.button-outlined,
.button-primary {
  padding: 6px 10px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: normal !important;
  height: 27px;
}

.miniSwiper {
  border-radius: 15px 15px 0 0;
}
.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.5;
}
.swiper-button-prev,
.swiper-button-next {
  height: auto;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  left: 16px;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  right: 16px;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 33px;
  @include phone {
    bottom: 20px;
  }
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 1;
}
</style>