<template>
  <div class="filter">
    <UiCheckbox label="Страна" :options="countries" :checked.sync="chosenCountries" />
    <UiCheckbox label="Страна" :options="countries" :checked.sync="chosenCountries" />
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
      :range.sync="rangeTime"
      :max="maxTime"
      :min="minTime"
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
      countries: [
        'Казахстан', 'Россия', 'Монголия'
      ],
      chosenCountries: [],
      rangeTime: [0, 5],
      maxTime: 10,
      minTime: 2,
      chosenType: ""
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