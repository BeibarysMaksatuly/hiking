<template>
  <div class="hero">
    <div class="swiper_items">
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
    </div>
    <swiper ref="heroSwiper" class="swiper" :options="swiperOptions">
      <swiper-slide v-for="(image, idx) in images" :key="idx"
        ><img :src="image" alt=""
      /></swiper-slide>
    </swiper>
    <div class="container-1" :class="{ opened: opened }">
      <div class="hero__title">
        {{ $t("main.hero.title") }}
        <span class="hero__highlight">{{ $t("main.hero.highlight") }}</span>
        {{ $t("main.hero.end") }}
      </div>
      <div class="hero__search">
        <div class="hero__selects">
          <UiSelect
            :options="formats"
            :model.sync="format"
            :label="$t('main.hero.tourFormat')"
            :placeholder="$t('main.hero.selectTourFormat')"
            class="inputs"
          />
          <UiSelect
            :options="countries"
            :model.sync="country"
            :label="$t('main.hero.country')"
            :placeholder="$t('main.hero.selectCountry')"
            class="inputs"
          />
          <UiSelect
            :options="seasons"
            :model.sync="season"
            :label="$t('main.hero.season')"
            :placeholder="$t('main.hero.selectSeason')"
            class="inputs"
          />
          <UiSelect
            :options="months"
            :model.sync="month"
            :label="$t('main.hero.month')"
            :placeholder="$t('main.hero.selectMonth')"
            class="inputs"
            :class="{ more_select: !season }"
            :more_select="!season"
            @opened="
              (val) => {
                opened = val;
              }
            "
          />
        </div>
        <div class="hero__button">
          <UiButton @click.native="findTours()">{{
            $t("main.hero.find")
          }}</UiButton>
        </div>
      </div>
    </div>
    <v-overlay :value="$fetchState.pending" z-index="999999">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#EF7F1A"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
Swiper.use([Navigation, Pagination, Autoplay]);
import SearchInline from "icons/search-inline.svg?inline";
import widthAdapter from "~/mixins/widhtAdapter";
export default {
  name: "MainHero",
  mixins: [widthAdapter],
  components: {
    SearchInline,
  },
  data() {
    return {
      formats: [],
      format: "",
      countries: [],
      country: null,
      seasons: [],
      season: null,
      months: [],
      month: null,
      swiperOptions: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      opened: false,
    };
  },
  async fetch() {
    await this.getFormats();
    await this.getCountries();
    await this.getSeasons();
    await this.getMonths();
  },
  watch: {
    async season() {
      await this.getMonths();
    },
  },
  computed: {
    images() {
      const arr = {
        false: [
          require("~/assets/images/bg.png"),
          require("~/assets/images/bg.png"),
          require("~/assets/images/bg.png"),
        ],
        true: [
          require("~/assets/images/bg_mobile.png"),
          require("~/assets/images/bg_mobile.png"),
          require("~/assets/images/bg_mobile.png"),
        ],
      };
      return arr[this.mobileViewSwiper];
    },
  },
  methods: {
    async getFormats() {
      this.formats = await this.$axios.$get("/formats/");
    },
    async getCountries() {
      this.countries = await this.$axios.$get("/country-list/");
    },
    async getSeasons() {
      this.seasons = await this.$axios.$get("/seasons/");
    },
    async getMonths() {
      this.months = await this.$axios.$get("/months/", {
        params: {
          season: this.season,
        },
      });
    },
    findTours() {
      this.$router.push(
        this.localeLocation({
          path: "/tours",
          query: {
            ...(this.format && { formats: this.format }),
            ...(this.country && { countries: this.country }),
            ...(this.season && { seasons: this.season }),
            ...(this.month && { month: this.month }),
          },
        })
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  height: 796px;
  margin-top: -76px;
  background-size: cover;
  transition: background-image 0.5s linear;
  @include phone {
    height: 820px;
  }

  &__title {
    max-width: 867px;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: $c-white;
    @include phone {
      font-size: 35px;
      font-weight: 700;
    }
    span {
      background: linear-gradient(268deg, #ef7f1a 18.8%, #fecc01 98.56%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__search {
    display: flex;
    width: 100%;
    padding: 20px 30px;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    border-radius: 10px;
    background: #fff;

    @include phone {
      flex-direction: column;
      padding: 20px;
      gap: 20px;
    }
  }

  &__selects {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    flex: 1;
    @include phone {
      flex-direction: column;
      width: 100%;
    }
  }

  &__button {
    width: 200px;

    @include phone {
      width: 100%;
    }
  }
}

.opened {
  z-index: 10 !important;
}
.container-1 {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 141px;
  padding-bottom: 194px;
  @include phone {
    padding-bottom: 100px;
    gap: 0;
    justify-content: space-between;
    padding-top: 106px;
  }
}

// selector
.inputs {
  min-width: 177px;
  width: max-content !important;
  @include phone {
    width: 100% !important;
  }
}
.more_select::v-deep .select__options {
  width: max-content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  @include phone {
    width: 100% !important;
  }
}

// swiper
.swiper_items {
  position: absolute;
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 60px;
  bottom: 60px;
  @include phone {
    bottom: 40px;
  }
}
.swiper {
  position: absolute;
  width: 100%;
  img {
    width: 100%;
    height: 796px;
		object-fit: cover;
    @include phone {
      height: 820px;
    }
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
  position: relative;
  width: unset !important;
  height: unset !important;
  margin: unset !important;
  left: 0;
  right: 0;
}
.swiper-pagination {
  position: relative;
  display: flex;
  gap: 8px;
}
.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-white !important;
  opacity: 1 !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 0.5;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: unset !important;
}
.swiper-pagination-progressbar {
  background: unset !important;
}
</style>