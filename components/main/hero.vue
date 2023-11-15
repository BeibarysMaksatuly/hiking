<template>
  <div class="hero">
    <!-- <div class="hero" :style="{ backgroundImage: backgroundImage }"> -->
    <v-overlay :value="$fetchState.pending" z-index="999999">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#EF7F1A"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div class="container-1">
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
          />
        </div>
        <div class="hero__button">
          <UiButton @click.native="findTours()">{{
            $t("main.hero.find")
          }}</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInline from "icons/search-inline.svg?inline";
// import widthAdapter from "~/mixins/widhtAdapter";
export default {
  name: "MainHero",
  // mixins: [widthAdapter],
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
      // currentBackgroundIndex: 0,
      // backgroundImages: [require("~/assets/images/bg.png")],
    };
  },
  // created() {
  //   this.startBackgroundRotation();
  // },
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
    // mobileView() {
    //   if (this.mobileView) {
    //     this.backgroundImages = [require("~/assets/images/bg_mobile.png")];
    //   } else {
    //     this.backgroundImages = [require("~/assets/images/bg.png")];
    //   }
    // },
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
    // startBackgroundRotation() {
    //   setInterval(() => {
    //     // Обновление индекса фонового изображения
    //     this.currentBackgroundIndex =
    //       (this.currentBackgroundIndex + 1) % this.backgroundImages.length;
    //   }, 5000); // Смена фона каждые 5 секунд
    // },
    // currentBackgroundImage() {
    //   return this.backgroundImages[this.currentBackgroundIndex];
    // },
  },
  // computed: {
  //   backgroundImage() {
  //     return `url(${this.currentBackgroundImage()})`;
  //   },
  // },
};
</script>
<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 796px;
  margin-top: -76px;
  background-size: cover;
  transition: background-image 0.5s linear;
  background-image: url("~/assets/images/bg.png");
  @include phone {
    height: 820px;
    background-image: url("~/assets/images/bg_mobile.png");
  }

  &__title {
    font-size: 55px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: $c-white;
    max-width: 786px;
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
    background: rgba(90, 148, 190, 0.5);
    backdrop-filter: blur(7.5px);

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

.container-1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 141px;
  padding-bottom: 85px;
  @include phone {
    padding-bottom: 50px;
    gap: 0;
    justify-content: space-between;
    padding-top: 106px;
  }
}

.button {
  border-radius: 10px;
  border: 1px solid #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 350px;
  flex-shrink: 0;

  @include phone {
    width: 100%;
  }

  &__text {
    width: 100%;
    color: $c-white;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    &:focus,
    &:focus-visible {
      outline: none;
    }
    &::placeholder {
      color: $c-white;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
    }
  }

  &__search {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: $c-white;
    margin-right: 14px;
  }
}
.inputs {
  min-width: 177px;
  width: max-content !important;
  @include phone {
    width: 100% !important;
  }
}
</style>