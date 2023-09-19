<template>
  <div class="filter">
    <UiCheckbox 
      label="Страна" 
      :options="countries" 
      :checked="chosenCountries" 
      @update-checked="chosenCountries = $event"
    />
    <UiCheckbox label="Сезон" :options="seasons" :checked.sync="chosenSeasons" />
    <UiSlider
      label="Продолжительность"
      :range.sync="rangeTime"
      :max="maxTime"
      :min="minTime"
      :step="1"
      hide-details
      title="дней"
    />
    <UiSlider
      label="Бюджет"
      :range.sync="moneyBudget"
      :max="maxBudget"
      :min="minBudget"
      :step="1"
      hide-details
      title="тг"
    />
    <UiRadio 
      label="Тип тура" 
      :options="['Групповой', 'Индивидуальный']" 
      :checked.sync="chosenType" 
    />
    <UiCheckbox label="Формат тура" :options="countries" :checked.sync="chosenCountries" />
    <UiCheckbox label="Тип размещения" :options="countries" :checked.sync="chosenCountries" />
    <UiCheckbox label="Занятия" :options="countries" :checked.sync="chosenCountries" />
    <UiButton class="filter__apply">Применить</UiButton>
    <UiButton type="error">Сбросить</UiButton>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countries: [],
      chosenCountries: [],
      seasons: [],
      chosenSeasons: [],
      rangeTime: [0, 5],
      moneyBudget: [0, 10000],
      maxTime: 10,
      minTime: 2,
      maxBudget: 100000,
      minBudget: 10000,
      chosenType: ""
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