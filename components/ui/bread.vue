<template>
  <div class="bread">
    <div class="bread__header" @click="toggleOpen">
      <div class="bread__title"><slot name="title"></slot></div>
      <Chevron :class="['bread__svg', isOpen && 'bread__svg-open']" />
    </div>
    <div :id="`content` + id" class="bread__data">
      <slot name="data" />
    </div>
    <slot name="line" />
  </div>
</template>

<script>
import Chevron from "@/assets/icons/chevron-down.svg?inline";
export default {
  props: ["id", "openAll"],
  components: {
    Chevron,
  },
  data() {
    return {
      isOpen: this.openAll,
    };
  },
  watch: {
    openAll(newVal) {
      this.isOpen = newVal;
    },
    isOpen(newVal) {
      this.adjustHeight();
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    adjustHeight() {
      const el = document.getElementById(`content${this.id}`);
      if (this.isOpen) {
        el.style.height = `${el.scrollHeight}px`;
      } else {
        el.style.height = "0";
      }
    },
  },
  mounted() {
    this.adjustHeight();
  },
};
</script>



<style lang="scss" scoped>
.bread {
  transition: all 0.3s ease;
  &__header {
    transition: all 0.3s ease;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    padding: 12px 17px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 8px 16px 0px rgba(18, 27, 33, 0.1);
  }

  &__title {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 28.8px */
    letter-spacing: 0.072px;
  }
  &__data {
    margin-top: 40px;
  }

  &__svg {
    width: 32px;
    height: 32px;
    transition: all 0.3s ease;
    &-open {
      transform: rotate(180deg) !important;
    }
  }

  &__data {
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
}
</style>