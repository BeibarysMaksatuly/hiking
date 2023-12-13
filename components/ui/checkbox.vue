<template>
  <div class="checkbox">
    <div class="checkbox__label" v-if="label">{{ label }}</div>
    <div class="checkbox__choices">
      <div
        class="checkbox__choice"
        v-for="(option, idx) in displayedOptions"
        :key="idx"
        @click="toggleCheckbox(option.id)"
      >
        <input
          type="checkbox"
          :id="'checkbox-' + option.id"
          :value="option.id"
          v-model="localChecked"
        />
        <label :for="'checkbox-' + option.name">{{ option.name }}</label>
      </div>
    </div>
    <button
      v-if="expandable && options.length > initialDisplayCount"
      @click="toggleShowAll"
    >
      {{ showAll ? "Меньше " + additionalText : "Больше " + additionalText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    additionalText: {
      type: String,
      default: "",
    },
    initialDisplayCount: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      localChecked: this.checked,
      showAll: false,
    };
  },
  watch: {
    checked: {
      handler(newVal) {
        this.localChecked = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    displayedOptions() {
      return this.showAll || !this.expandable
        ? this.options
        : this.options.slice(0, this.initialDisplayCount);
    },
    expandable() {
      return (
        this.additionalText.length > 0 &&
        this.options.length > this.initialDisplayCount
      );
    },
  },
  methods: {
    toggleCheckbox(optionId) {
      const indexInChecked = this.localChecked.indexOf(optionId);
      if (indexInChecked >= 0) {
        this.localChecked.splice(indexInChecked, 1);
      } else {
        this.localChecked.push(optionId);
      }
      this.$emit("input", this.localChecked);
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  flex-direction: column;

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
  border: 2px solid #dfe0eb;
  width: 20px;
  height: 20px;
  &:checked {
    border: 2px solid #f2c94c;
    background-image: url("~/assets/icons/active.svg");
    background-position: center;
  }
  &:checked + label {
    font-weight: 600;
  }
}

label {
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
}

button {
  color: #06d;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  margin-top: 20px;
  text-align: start;
}
</style>