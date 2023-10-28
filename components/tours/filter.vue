<template>
  <div class="filter">
    <div class="filter__data">
        <div class="filter__main">
          <UiCheckbox 
            :label="$t('tours.country')" 
            :options="chosenCountries" 
            :checked="query.countries" 
            @input="choseInput"
          />
          <UiCheckbox 
            :label="$t('tours.season')" 
            :options="chosenSeasons" 
            :checked="query.seasons" 
            @input="choseSeasonInput"
          />
          <UiSlider
            :label="$t('tours.duration')"
            :range="query.duration"
            :max="maxTime"
            :min="minTime"
            :step="1"
            hide-details
            title="дней"
            @input="changeDuration"
          />
        </div>
        <div class="filter__add" v-if="isOpen || !isMobile">
          <UiSlider
            :label="$t('tours.budget')"
            :range="query.budget"
            :max="maxBudget"
            :min="minBudget"
            :step="1"
            hide-details
            title="тг"
            @input="changeBudget"
          />
          <UiRadio 
            :label="$t('tours.type')" 
            :options="toursType" 
            :checked="query.direction" 
            @input="choseDirection"
          />
          <UiCheckbox 
            :label="$t('tours.format')" 
            :options="chosenFormats" 
            :checked="query.formats" 
            @input="choseFormat"
          />
          <UiCheckbox 
            :label="$t('tours.placement')" 
            :options="chosenPlacements" 
            :checked="query.placements" 
            @input="chosePlacements"
          />
          <UiCheckbox 
            :label="$t('tours.tags')" 
            :options="chosenTags" 
            :checked="query.tags"
            @input="choseTags" 
          />
        </div>
    </div>
    <div v-if="isMobile" @click="isOpen = !isOpen" :class="['filter__show-more-mobile']">
      <div>{{ isOpen ? $t("tours.lessParameters") : $t("tours.moreParameters") }}</div>
      <ChevronDown :class="['filter__down', isOpen && 'filter__down-open']" />
    </div>
    <UiButton class="filter__apply" @click.native="$emit('filter', query)">{{ $t("tours.apply") }}</UiButton>
    <UiButton type="error" @click.native="reset">{{ $t("tours.reset") }}</UiButton>
  </div>
</template>
<script>
import ChevronDown from 'icons/chevron-down.svg?inline';
export default {
  components: {
    ChevronDown
  },
  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isOpen: false,
      chosenCountries: [],
      chosenSeasons: [],
      chosenFormats: [],
      chosenPlacements: [],
      chosenTags: [],
      maxTime: 0,
      minTime: 0,
      maxBudget: 0,
      minBudget: 0,
      query: {
        countries: [],
        seasons: [],
        tags: [],
        placements: [],
        direction: 1,
        budget: [0, 0],
        duration: [0, 0],
      }
    }
  },
  async fetch() {
    await this.getMaxMinData()
    await this.getCountries()
    await this.getSeasons()
    await this.getFormats()
    await this.getPlacements()
    await this.getTags() 
    this.query = this.filters
  },
  watch: {
    filters: {
      handler(val) {
        this.query = val
      },
      deep: true
    }
  },
  computed: {
    toursType() {
      return [
        { id: 1, name: this.$t('tours.group') }, 
        { id: 2, name: this.$t('tours.individual') } 
      ]
    },
    isMobile() {
      if (process.client) {
        return window.innerWidth <= 960
      }
      return true
    }
  },
  methods: {
    async getMaxMinData() {
      const data = await this.$axios.$get('/tour-filter-data/')
      this.maxTime = data.max_date || 0
      this.minTime = data.min_date || 0
      this.maxBudget = data.max_price || 0
      this.minBudget = data.min_price || 0
    },
    async getCountries() {
      this.chosenCountries = await this.$axios.$get('/country-list/')
    },
    async getSeasons() {
      this.chosenSeasons = await this.$axios.$get('/seasons/')
    },
    async getFormats() {
      this.chosenFormats = await this.$axios.$get('/formats/')
    },
    async getPlacements() {
      this.chosenPlacements = await this.$axios.$get('/placements/')
    },
    async getTags() {
      this.chosenTags = await this.$axios.$get('/tags/')
    },
    choseInput(value) {
      this.query.countries = value
    },
    choseSeasonInput(value) {
      this.query.seasons = value
    },
    choseFormat(value) {
      this.query.formats = value
    },
    chosePlacements(value) {
      this.query.placements = value
    },
    choseTags(value) {
      this.query.tags = value
    },
    choseDirection(value) {
      this.query.direction = value
    },
    changeDuration(value) {
      this.query.duration = value
    },
    changeBudget(value) {
      this.query.budget = value
    },
    reset() {
      this.query.countries = []
      this.query.seasons = []
      this.query.formats = []
      this.query.placements = []
      this.query.tags = []
      this.query.direction = 1
    }
  }
}
</script>
<style lang="scss" scoped>
.filter {
  display: flex;
  width: 270px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background: #fff;

  &__data, &__main, &__add {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  &__data {
    overflow-y: scroll;
    max-height: 724px;

    &::-webkit-scrollbar {
      width: 5px;
      // height: 100px;
      color: #DDE1E6;
    }
    @include phone {
      height: auto;
    }
  }

  @include phone {
    width: 100%;
  }

  &__apply {
    margin-bottom: -10px;
  }

  &__down {
    width: 24px;
    height: 24px;
    &-open {
      transform: rotate(180deg) !important;
    }
  }
  &__show-more-mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    color: $c-yellow;
    margin-bottom: -10px;
  }
}
</style>