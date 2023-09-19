<template>
  <div class="checkbox">
    <div class="checkbox__label" v-if="label">{{ label }}</div>
    <div class="checkbox__choices">
      <div 
        class="checkbox__choice" 
        v-for="(option, idx) in options" 
        :key="idx">
          <input 
            type="checkbox" 
            :value="option.id" 
            v-model="localChecked"
            >
          <label for="checkbox">{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
    }
  },
  computed: {
    localChecked: {
      get() {
        return this.checked
      },
      set(value) {
        console.log(value)
        this.$emit('update:checked', value)
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.checkbox {
  display: flex;
  flex-direction:  column;

  &__label {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 15px;
  }
  &__choices {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__choice {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

input[type="checkbox"] {
  flex-shrink: 0;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #DFE0EB;
  width: 20px;
  height: 20px;
  &:checked {
    border: 2px solid #F2C94C;
    background-image: url('~/assets/icons/active.svg');
    background-position: center;
  }
  &:checked + label {
    font-weight: 600;
  }
}

label {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
}
</style>