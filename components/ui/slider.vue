<template>
  <div class="slider">
    <div class="slider__label" v-if="label">{{ label }}</div>
    <v-range-slider
        v-model="localRange"
        :max="max"
        :min="min"
        :step="1"
        color="#324552"
        hide-details
        @change="() => $emit('input', localRange)"
    ></v-range-slider>
    <div class="slider__result">
      От <span>{{ range[0] }}</span> до <span>{{ range[1] }}</span> {{ title }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    range: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      localRange: this.range
    }
  },
  watch: {
    range: {
      handler(val) {
        this.localRange = val
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.slider {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__label {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 15px; 
  }

  &__result {
    margin-top: 10px;
    font-size: 16px;
    font-style: normal;
    line-height: 21px;
    span {
      font-weight: 600;
    }
  }
}
</style>