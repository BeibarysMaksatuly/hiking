<template>
  <div class="mobile-header__container">
    <div class="mobile-header">
      <div class="mobile-header__data">
        <div class="mobile-header__header">
          <Logo class="header__logo" />
          <Close class="header__close" @click="$emit('close-mobile')" />
        </div>
        <div class="mobile-header__links">
          <nuxt-link 
            v-for="(link, idx) in headerLinks" 
            :to="localePath(link.to)"
            :key="idx" 
            class="mobile-header__link"
            @click.native="close()"
            >
            {{ link.name }}
          </nuxt-link>
        </div>
      </div>
      <div class=mobile-header__bottom>
        <div class="mobile-header__lang" @click="openLangModal">
          <div class="lang__lang">{{ LocaleName }}</div>
          <Arrow />
        </div>
        <a class="mobile-header__phone" href="tel:87084545555" target="_blank">
          <Call class="phone__icon" />
          <div class="phone__text">+7 (708) 454 - 55 - 55</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from 'icons/logo.svg?inline';
import Search from 'icons/search.svg?inline';
import Call from 'icons/call.svg?inline';
import Close from 'icons/close.svg?inline';
import Arrow from 'icons/chevron-right.svg?inline';
export default {
  name: 'SharedMobileHeader',
  components: {
    Logo, Search, Call, Close, Arrow
  },
  computed: {
    headerLinks() {
      return [
      {
          name: this.$t("header.main"),
          to: "/"
        },
        {
          name: this.$t("header.tours"),
          to: "/tours"
        },
        {
          name: this.$t("header.advices"),
          to: "/advices"
        },
        {
          name: this.$t("header.services"),
          to: "/services"
        },
        {
          name: this.$t("header.about"),
          to: "/about"
        },
        {
          name: this.$t("header.contacts"),
          to: "/contacts"
        },
      ]
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
    locale() {
      return this.$i18n.locale
    },
    LocaleName() {
      return this.languages.find(item => item.id === this.locale).name
    }
  },
  methods: {
    close() {
      this.$emit('close-mobile')
    },
    openLangModal() {
      this.$emit('open-lang-modal')
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-header {
  width: 273px;
  height: 100vh;
  padding: 30px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $c-white;

  &__container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    top: 0;
    left: 0;
    background: rgba(21, 21, 21, 0.41);
  }

  &__data {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 50px;
    width: 100%;
  }

  &__header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 294px;
    width: 100%;
  }

  &__link {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; 
  }

  &__phone {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    cursor: pointer;
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
  &__lang {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 24px;
      height: 24px;
      color: #FECD15;
    }
  }
}

.header {
  &__logo {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }

  &__close {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    color: $c-yellow;
  }
}
</style>