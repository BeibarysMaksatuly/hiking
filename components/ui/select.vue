<template>
  <div
    :class="['select', isMain && 'select-main']"
    v-click-outside="hideSelect"
  >
    <div class="select__label" v-if="label">{{ label }}</div>
    <div class="select__data" @click="isSelectOpen = !isSelectOpen">
      <div class="select__model" v-if="!isOptionsImages">
        {{
          (options.find((item) => item.id === model) &&
            options.find((item) => item.id === model).name) ||
          placeholder
        }}
      </div>
      <div v-else class="flag">
        <component :is="getLangFlag(model)" />
      </div>
      <ChevronBottom
        :class="['select__icon', isSelectOpen && 'select__icon-active']"
      />
    </div>
    <transition name="slide-fade" mode="out-in">
      <div class="select__options" v-show="isSelectOpen">
        <div
          :class="[
            'select__option',
            { 'select__option-active': option.id === model },
          ]"
          v-for="(option, idx) in options"
          :key="idx"
          @click="choose(option)"
        >
          <div v-if="!isOptionsImages" class="option__name">
            {{ option.name }}
            <Check class="option__check" v-if="option.id === model" />
          </div>
          <div v-else class="option__name">
            <component :is="getLangFlag(option.id)" />
            <Check class="option__check" v-if="option.id === model" />
          </div>
          <div
            v-if="
              (!more_select && idx + 1 !== options.length) ||
              (more_select &&
                idx + 1 !== options.length &&
                idx + 2 !== options.length &&
                idx + 3 !== options.length)
            "
            class="option__line"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ChevronBottom from "icons/chevron-bottom.svg?inline";
import ru from "icons/russia.svg?inline";
import kk from "icons/kazakhstan.svg?inline";
import en from "icons/uk.svg?inline";
import Check from "icons/check.svg?inline";
import vClickOutside from "v-click-outside";
export default {
  components: {
    ChevronBottom,
    ru,
    kk,
    en,
    Check,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    model: {
      type: [String, Number],
      default: "",
    },
    isMain: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    isOptionsImages: {
      type: Boolean,
      default: false,
    },
    more_select: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelectOpen: false,
    };
  },
  methods: {
    hideSelect() {
      this.isSelectOpen = false;
    },
    choose(option) {
      this.isSelectOpen = false;
      this.$emit("update:model", option.id);
    },
    getLangFlag(lang) {
      return lang === "ru" ? ru : lang === "kk" ? kk : en;
    },
  },
};
</script>
<style lang="scss" scoped>
.flag {
  display: flex;
  align-items: center;
}

.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

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
  color: $c-main;

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

    &-active {
      transform: rotate(180deg);
      transition: 300ms linear all;
    }
  }

  &__options {
    position: absolute;
    z-index: 100;
    width: 100%;
    max-height: 175px;
    overflow-y: scroll;
    top: 120%;
    border-radius: 10px;
    background: rgba(90, 148, 190, 0.8);
    backdrop-filter: blur(7.5px);
    padding: 10px;
    transition: 300ms linear all;

    &::-webkit-scrollbar {
      height: 12px;
      width: 3px;
      border-radius: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // background: #f1f1f1;
      width: 10px;
      border-radius: 5px;
      margin: 5px 0;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #a0b4c3;
      border-radius: 5px;
      width: 6px;
      height: 10% !important;
    }
  }
  &__option {
    cursor: pointer;
    &-active {
      color: #ffc107 !important;
    }
    &:hover {
      .option__name {
        color: #ffc107 !important;
      }
    }
  }
}

.option {
  &__name {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    transition: 0.3s;
  }
  &__line {
    background: #fff;
    height: 1px;
    width: 100%;
    flex-shrink: 0;
    margin-top: 9px;
    margin-bottom: 9px;
  }
  &__check {
    width: 16px;
    height: 16px;
    color: #ffc107;
  }
}
</style>