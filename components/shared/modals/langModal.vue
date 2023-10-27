<template>
  <div class="overlay">
    <div class="modal">
      <Close class="modal__close" @click="$emit('close-modal-lang')" />
      <div class="modal__title">{{ $t("header.chooseLang") }}</div>
      <div class="modal__choices"> 
        <div 
          class="modal__choice" 
          v-for="(option, idx) in languages" 
          :key="idx">
            <label for="radio">{{ option.name }}</label>
            <input 
              type="radio" 
              :value="option.id" 
              v-model="lang"
              >
        </div>
      </div>
      <UiButton @click.native="changeLocale(lang)" :class="['modal__button']">{{ $t("header.save") }}</UiButton>
    </div>
  </div>
</template>
<script>
import Close from '@/assets/icons/close.svg?inline';
export default {
  components: {
    Close
  },
  data() {
    return {
      lang: ""
    }
  },
  mounted() {
    if (!this.lang) {
      this.lang = this.locale
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
    languages() {
      return [
        {
          name: this.$t("header.russian"),
          id: "ru"
        },
        {
          name: this.$t("header.kazakh"),
          id: "kk"
        },
        {
          name: this.$t("header.english"),
          id: "en"
        },
      ]
    },
  },
  methods: {
    changeLocale(id) {
      if (this.locale === id) { return }
      this.lang = id
      if (this.$route.path !== this.switchLocalePath(id)) {
        this.$router.replace(this.switchLocalePath(id))
      }
      this.$emit('close-modal-lang')
    }
  }
}
</script>
<style lang="scss" scoped>
.overlay {
  background: rgba(21, 21, 21, 0.41);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
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
    border: none;
    // border: 2px solid #F2C94C;
    background-image: url('~/assets/icons/active.svg');
    background-position: center;
  }
  &:checked + label {
    font-weight: 600;
  }
}

.modal {
  border-radius: 10px;
  background: #FFF;
  position: relative;
  display: flex;
  width: 480px;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  @include phone {
    width: 100%;
    padding: 20px;
    margin-left: 16px;
    margin-right: 16px;
  }
  &__svg {
    width: 104px;
    height: 104px;

    &--fail {
      color: #DC3545;
    }
  }

  &__choice {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    &:not(:last-child) {
      border-bottom: 1px solid #DFE0EB;
    }
  }

  &__text {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }

  &__close {
    width: 24px;
    height: 24px;
    color: #FFC107;
    margin-left: auto;
  }

  &__title {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
  }

  &__choices {
    width: 100%;
    margin-top: -10px;
  }
}
</style>