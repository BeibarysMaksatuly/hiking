<template>
  <div class="select">
    <div class="select__label">{{ label }}</div>
    <div class="select__data">
      <div class="select__model">{{ options.find(item => item.id === model)  && options.find(item => item.id === model).name }}</div>
      <ChevronBottom class="select__icon" @click="isSelectOpen = !isSelectOpen" />
    </div>
    <div class="select__options" v-if="isSelectOpen">
      <div 
        class="select__option" 
        v-for="(option, idx) in options"
        :key="idx"
        @click="choose(option)"
        >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
<script>
import ChevronBottom from 'icons/chevron-bottom.svg?inline';
export default {
  components: {
    ChevronBottom
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    model: {
      type: [String, Number],
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isSelectOpen: false
    }
  },
  methods: {
    choose(option) {
      this.isSelectOpen = false;
      this.$emit('update:model', option.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.select {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: $c-white;

  &__label {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
  }

  &__data {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }

  &__model {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
  }

  &__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: $c-yellow;
  }

  &__options {
    position: absolute;
    top: 120%;
  }
}
</style>