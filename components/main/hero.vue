<template>
  <div class="hero" >
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
        Погрузись в дивный мир Алтая – прикоснись к природе сердцем.
      </div>
      <div class="hero__search">
        <button class="button">
          <input class="button__text" placeholder="Найти тур" v-model="tourName" />
          <SearchInline class="button__search" />
        </button>
        <div class="hero__selects">
          <UiSelect 
            :options="countries" 
            :model.sync="country"
            label="Страна"
          />
          <UiSelect 
            :options="seasons" 
            :model.sync="season"
            label="Сезон"
          />
        </div>
        <div class="hero__button">
          <UiButton @click.native="findTours()">Найти</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInline from 'icons/search-inline.svg?inline';
export default {
  name: "MainHero",
  components: {
    SearchInline
  },
  data() {
    return {
      country: null,
      countries: [],
      seasons: [],
      season: null,
      tourName: ""
    }
  },
  async fetch() {
    await this.getCountries()
    await this.getSeasons()
  },
  methods: {
    async getCountries() {
      this.countries = await this.$axios.$get('/country-list/')
    },
    async getSeasons() {
      this.seasons = await this.$axios.$get('/seasons/')
    },
    findTours() {
      this.$router.push({
        path: '/tours',
        query: {
          countries: this.country,
          seasons: this.season,
          search: this.tourName
        }
      })
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
.hero {
  background-image: url('~/assets/images/bg.png');
  width: 100%;
  height: 796px;
  margin-top: -76px;
  background-size: cover;
  @include phone {
    height: 820px;
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
  }

  &__search {
    display: flex;
    width: 100%;
    padding: 20px 40px;
    justify-content: space-between;
    align-items: center;
    gap: 59px;
    border-radius: 10px;
    background: rgba(90, 148, 190, 0.50);
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
    gap: 30px;
    flex: 1;
    @include phone {
      flex-direction: column;
      width: 100%;
    }
  }

  &__button {
    width: 232px;

    @include phone {
      width: 100%;
    }
  }
}

.container-1 {
  display: flex;
  flex-direction: column;
  gap: 111px;
  padding-top: 308px;
  @include phone {
    padding-top: 106px;
  }
}

.button {
  border-radius: 10px;
  border: 1px solid #E1E1E1;
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
    &:focus, &:focus-visible {
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
</style>