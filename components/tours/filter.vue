<template>
  <div class="filter">
    <UiCheckbox 
      label="Страна" 
      :options="chosenCountries" 
      :checked="query.countries" 
      @input="choseInput"
    />
    <UiCheckbox 
      label="Сезон" 
      :options="chosenSeasons" 
      :checked="query.seasons" 
      @input="choseSeasonInput"
    />
    <UiSlider
      label="Продолжительность"
      :range="duration"
      :max="maxTime"
      :min="minTime"
      :step="1"
      hide-details
      title="дней"
      @input="changeDuration"
    />
    <UiSlider
      label="Бюджет"
      :range="budget"
      :max="maxBudget"
      :min="minBudget"
      :step="1"
      hide-details
      title="тг"
      @input="changeBudget"
    />
    <UiRadio 
      label="Тип тура" 
      :options="[{id: 1, name: 'Групповой'}, {
        id: 2,
        name: 'Индивидуальный'
      } ]" 
      :checked="query.direction" 
      @input="choseDirection"
    />
    <UiCheckbox 
      label="Формат тура" 
      :options="chosenFormats" 
      :checked="query.formats" 
      @input="choseFormat"
    />
    <UiCheckbox 
      label="Тип размещения" 
      :options="chosenPlacements" 
      :checked="query.placements" 
      @input="chosePlacements"
    />
    <UiCheckbox 
      label="Занятия" 
      :options="chosenTags" 
      :checked="query.tags"
      @input="choseTags" 
    />
    <UiButton class="filter__apply" @click.native="$emit('filter', query)">Применить</UiButton>
    <UiButton type="error" @click.native="reset">Сбросить</UiButton>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenCountries: [],
      chosenSeasons: [],
      chosenFormats: [],
      chosenPlacements: [],
      chosenTags: [],
      duration: [1, 5],
      maxTime: 10,
      minTime: 2,
      budget: [1, 10000],
      maxBudget: 100000,
      minBudget: 0,
      query: {
        countries: [],
        seasons: [],
        tags: [],
        placements: [],
        direction: 1,
      }
    }
  },
  async fetch() {
    await this.getCountries()
    await this.getSeasons()
    await this.getFormats()
    await this.getPlacements()
    await this.getTags() 
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
      this.duration = value
    },
    changeBudget(value) {
      this.budget = value
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