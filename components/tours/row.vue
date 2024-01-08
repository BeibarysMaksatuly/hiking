<template>
  <div class="row-1">
    <client-only>
      <swiper :pagination="true" class="swiper" :options="swiperOptions">
        <swiper-slide v-for="image in tour.images" :key="image.id">
          <template v-if="isImage(image.image)">
            <img :src="image.image" alt="mini photo" />
          </template>
          <template v-else>
            <VideoBlock
              :video_source="image.image"
              @openVideo="(video_open = true), (video_source = image.image)"
            />
          </template>
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
    <div class="row-1__data">
      <div class="row-1__title">{{ tour.name }}</div>
      <div class="row-1__subtitle">
        {{ tour.short_description }}
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
        <div
          class="row-1__place row-1__place--green"
          v-for="format in tour.formats"
          :key="format.id"
        >
          <div class="circle"></div>
          <div>{{ format.name }}</div>
        </div>
      </div>
    </div>
    <div class="mini__info">
      <div class="info__days">
        <div>
          <img src="@/assets/images/sun.svg" alt="" />
          {{ tour.days }} {{ $t("others.days") }}
        </div>
        <div>
          <img src="@/assets/images/moon.svg" alt="" />
          {{ tour.nights }} {{ $t("others.nights") }}
        </div>
      </div>
      <v-tooltip bottom v-model="show">
        <template v-slot:activator="{}">
          <div
            class="info__map"
            @click="show = !show"
            v-click-outside="hideShow"
          >
            <Calendar />
            <div>{{ $t("others.watch_dates") }}</div>
          </div>
        </template>
        <ul>
          <li v-for="date in tour.dates" :key="date.id">
            {{ formatDate(date.start_date) }} -
            {{ formatDate(date.end_date) }}
          </li>
        </ul>
      </v-tooltip>
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
    <VideoPopup
      v-if="video_open"
      :video_source="video_source"
      @closeVideo="(video_open = false), (video_source = null)"
    />
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
  name: "row",
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
      video_open: false,
      video_source: null,
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
    isImage(url) {
      return /\.(jpg|jpeg|png|webp|gif|bmp|tiff)$/.test(url.toLowerCase());
    },
  },
};
</script>

<style lang="scss" scoped>
.row-1 {
  display: flex;
  flex-direction: row;

  background-color: #fff;
  border-radius: 15px 0 0 15px;

  @include phone {
    flex-direction: column;
    border-radius: 15px;
  }

  &__data {
    display: flex;
    flex-direction: column;
    padding: 20px 0 20px 20px;
    flex: 1;
    @include phone {
      width: 100%;
      padding: 10px 10px 20px;
    }
  }

  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 8px;
    @include phone {
      font-size: 14px;
      line-height: 130%;
      margin-bottom: 5px;
    }
  }

  &__subtitle {
    color: #324552;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    @include phone {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 20px;
      -webkit-line-clamp: 2;
    }
  }

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
  }

  &__place {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #324552;

    padding: 4px 12px;
    gap: 5px;
    border-radius: 10px;
    background: #f9f9f9;
    &--green {
      background: #f0fff4 !important;
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
}

.swiper {
  width: 340px;
  height: 306px;
  border-radius: 15px;

  @include phone {
    width: 100%;
    height: 180px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
}

.mini {
  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px 20px 20px 0;
    @include phone {
      align-items: flex-start;
      padding: 0px 10px 6px;
    }
  }
}

.info {
  &__days {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
    gap: 14px;
    @include phone {
      margin-bottom: 20px;
    }
    div {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 6px;
        @include phone {
          width: 20px;
          height: 20px;
        }
      }
      color: #000;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
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
    cursor: pointer;
    margin-bottom: 16px;
    text-decoration-line: underline;
    @include phone {
      margin-bottom: 20px;
    }
    svg {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      color: $c-main;
    }
  }

  &__price {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #324552;
    @include phone {
      font-size: 16px;
      font-weight: 600;
      line-height: 130%;
    }
  }

  &__first {
    margin-bottom: 16px;
    margin-top: auto;
    @include phone {
      margin-bottom: 10px;
      margin-top: 20px;
    }
  }
}

.button-outlined,
.button-primary {
  height: 41px;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 500 !important;
  line-height: 21px !important;
  border-radius: 12px !important;
  @include phone {
    height: 27px;
    padding: 6px 10px !important;
    font-size: 12px !important;
    font-style: normal !important;
    font-weight: 500 !important;
    line-height: normal !important;
  }
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
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 1;
}
</style>