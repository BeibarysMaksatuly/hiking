<template>
  <div class="filter">
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
    <UiButton class="filter__apply" @click.native="$emit('filter', query)">{{ $t("tours.apply") }}</UiButton>
    <UiButton type="error" @click.native="reset">{{ $t("tours.reset") }}</UiButton>
  </div>
</template>
<script>
export default {
  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chosenCountries: [],
      chosenSeasons: [],
      chosenFormats: [],
      chosenPlacements: [],
      chosenTags: [],
      maxTime: 50,
      minTime: 0,
      maxBudget: 100000,
      minBudget: 0,
      query: {
        countries: [],
        seasons: [],
        tags: [],
        placements: [],
        direction: 1,
        budget: [1, 10000],
        duration: [1, 5],
      }
    }
  },
  async fetch() {
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
    }
  },
  methods: {
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

  @include phone {
    width: 100%;
  }

  &__apply {
    margin-bottom: -5px;
  }
}
</style>