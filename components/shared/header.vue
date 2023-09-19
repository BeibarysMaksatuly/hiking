<template>
  <div :class="['header', isMain && 'main-header']">
    <div class="container-1">
      <nuxt-link to="/">
        <Logo class="header__logo" />
      </nuxt-link>
      <div class="header__links">
        <nuxt-link 
          v-for="(link, idx) in headerLinks" 
          :to="link.to"
          :key="idx" 
          class="header__link">
          {{ link.name }}
        </nuxt-link>
      </div>
      <Search class="header__search" />
      <a class="header__phone" href="" target="_blank">
        <Call class="phone__icon" />
        <div class="phone__text">+7 (708) 454 - 55 - 55</div>
      </a>
      <Drag class="header__drag" @click="$emit('open-mobile')" />
    </div>
  </div>
</template>
<script>
import Logo from 'icons/logo.svg?inline';
import Search from 'icons/search.svg?inline';
import Call from 'icons/call.svg?inline';
import Drag from 'icons/drag.svg?inline';
export default {
  name: 'SharedHeader',
  props: {
    isMain: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Logo, Search, Call, Drag
  },
  computed: {
    headerLinks() {
      return [
        {
          name: 'Главная',
          to: "/"
        },
        {
          name: 'Туры',
          to: "/tours"
        },
        {
          name: 'Советы',
          to: "/advices"
        },
        {
          name: 'Услуги',
          to: "/services"
        },
        {
          name: 'О нас',
          to: "/about"
        },
        {
          name: 'Контакты',
          to: "/contacts"
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>

.main-header {
  background-color: transparent !important;
  :deep(.header__link) {
    color: $c-white !important;
  }
  :deep(.phone__text) {
    color: $c-white !important;
  }
  box-shadow: none !important;
}
.container-1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  gap: 40px;

  @include phone {
    flex-direction: row-reverse;
    height: 56px;
  }
}
.header {
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.10);

  &__logo {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    @include phone {
      width: 26px;
      height: 26px;
    }
  }
  &__links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 0 0;

    @include phone {
      display: none;
    }
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
    gap: 15px;

    @include phone {
      display: none;
    }
  }

  &__search {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &__drag {
    display: none;

    @include phone {
      display: block;
      margin-right: auto;
      width: 24px;
      height: 24px;
      color: $c-yellow;
    }
  }
}

.phone {
  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }
}

</style>