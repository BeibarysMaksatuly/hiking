<template>
  <div class="radio">
    <div class="radio__label" v-if="label">{{ label }}</div>
    <div class="radio__choices">
      <div 
        class="radio__choice" 
        v-for="(option, idx) in options" 
        :key="idx">
          <input 
            type="radio" 
            :value="option.id" 
            v-model="localDirection"
            @change="() => $emit('input', localDirection)"
            >
          <label for="radio">{{ option.name }}</label>
      </div>
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
    options: {
      type: Array,
      default: () => []
    },
    checked: {
      type: [String, Array, Number],
      required: true
    },
  },
  data() {
    return {
      localDirection: 1
    }
  },
  watch: {
    checked: {
      handler(val) {
        this.localDirection = this.checked
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.radio {
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

input[type="radio"] {
  flex-shrink: 0;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
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