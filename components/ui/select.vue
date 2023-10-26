<template>
  <div :class="['select', isMain && 'select-main']">
    <div class="select__label" v-if="label">{{ label }}</div>
    <div class="select__data" @click="isSelectOpen = !isSelectOpen">
      <div class="select__model">{{ options.find(item => item.id === model)  && options.find(item => item.id === model).name  || placeholder}}</div>
      <ChevronBottom class="select__icon" />
    </div>
    <div class="select__options" v-if="isSelectOpen">
      <div 
        :class="['select__option', { 'select__option-active': option.id === model }]" 
        v-for="(option, idx) in options"
        :key="idx"
        @click="choose(option)"
        >
        <div class="option__name">{{ option.name }}</div>
        <div v-if="idx+ 1 !== options.length" class="option__line"></div>
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
    placeholder: {
      type: String,
      default: ""
    },
    model: {
      type: [String, Number],
      default: ""
    },
    isMain: {
      type: Boolean,
      default: false
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

.select-main {
  .select__model {
    color: $c-main !important;
  }
}
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
    cursor: pointer;
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
    width: 100%;
    top: 120%;
    border-radius: 10px;
    background: rgba(90, 148, 190, 0.80);
    backdrop-filter: blur(7.5px);
    padding: 10px;
  }
  &__option {
    &-active {
      color: #FFC107 !important;
    }
  }
}

.option {
  &__name {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; 

  }
  &__line {
    background: #FFF;
    height: 1px;
    width: 100%;
    flex-shrink: 0;
    margin-top: 9px;
    margin-bottom: 9px;
  }
}
</style>