<template>
  <div
    :class="['header', { 'main-header': isMain && !(scrollPosition > 600) }]"
  >
    <div class="container-1">
      <nuxt-link to="/">
        <Logo class="header__logo" />
      </nuxt-link>
      <div class="header__links" v-if="input">
        <nuxt-link
          v-for="(link, idx) in headerLinks"
          :to="localePath(link.to)"
          :key="idx"
          class="header__link"
        >
          {{ link.name }}
        </nuxt-link>
      </div>
      <div v-if="!input" class="hey" v-click-outside="hideInput">
        <UiInput :model.sync="search"> </UiInput>
        <UiButton @click.native="searchYandex">{{
          $t("header.done")
        }}</UiButton>
      </div>

      <Search class="header__search" v-if="input" @click="showInput" />
      <a class="header__phone" href="" target="_blank">
        <Call class="phone__icon" />
        <div class="phone__text">+7 (708) 454 - 55 - 55</div>
      </a>
      <Drag class="header__drag" v-if="input" @click="$emit('open-mobile')" />
      <UiSelect
        class="header__lang"
        :options="languages"
        :placeholder="LocaleName"
        :isMain="!isMain"
        :model="lang"
        isOptionsImages
        @update:model="changeLocale"
      />
    </div>
  </div>
</template>
<script>
import Logo from "icons/logo.svg?inline";
import Search from "icons/search.svg?inline";
import Call from "icons/call.svg?inline";
import Drag from "icons/drag.svg?inline";
import vClickOutside from "v-click-outside";
export default {
  name: "SharedHeader",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    isMain: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: true,
      search: "",
      lang: "",
      scrollPosition: null,
    };
  },
  mounted() {
    if (this.lang !== this.$i18n.locale) {
      this.changeLocale(this.$i18n.locale);
    }
    this.lang = this.$i18n.locale;
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    showInput() {
      this.input = !this.input;
    },
    hideInput() {
      this.input = true;
    },
    searchYandex() {
      window.open(
        `https://yandex.ru/search/?text=${this.search}&?url:http://86.107.45.254/`
      );
      this.showInput();
    },
    changeLocale(id) {
      if (this.locale === id) {
        return;
      }
      this.lang = id;
      if (this.$route.path !== this.switchLocalePath(id)) {
        this.$router.replace(this.switchLocalePath(id));
      }
    },
    updateScroll() {
      if (process.client) {
        this.scrollPosition = window.scrollY;
      }
    },
  },
  components: {
    Logo,
    Search,
    Call,
    Drag,
  },
  computed: {
    headerLinks() {
      return [
        {
          name: this.$t("header.main"),
          to: "/",
        },
        {
          name: this.$t("header.tours"),
          to: "/tours",
        },
        {
          name: this.$t("header.advices"),
          to: "/advices",
        },
        {
          name: this.$t("header.services"),
          to: "/services",
        },
        {
          name: this.$t("header.about"),
          to: "/about",
        },
        {
          name: this.$t("header.contacts"),
          to: "/contacts",
        },
      ];
    },
    languages() {
      return [
        {
          name: this.$t("header.russian"),
          id: "ru",
        },
        {
          name: this.$t("header.kazakh"),
          id: "kk",
        },
        {
          name: this.$t("header.english"),
          id: "en",
        },
      ];
    },
    locale() {
      return this.$i18n.locale;
    },
    LocaleName() {
      return this.languages.find((item) => item.id === this.locale).name;
    },
  },
};
</script>
<style lang="scss" scoped>
svg {
  cursor: pointer;
  path {
    transition: fill 0.3s ease;
  }
  &:hover {
    path {
      fill: $c-orange !important;
    }
  }
}
.hey {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex: 1;
  align-items: center;

  button {
    width: max-content;
  }
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
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);
  transition: all 0.3s ease;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;

  &__logo {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    @include phone {
      width: 26px;
      height: 26px;
    }
  }
  &__lang {
    width: 63px !important;
    @include phone {
      display: none !important;
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
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: $c-orange !important;
    }
  }

  &__phone {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;

    @include phone {
      display: none;
    }
    &:hover {
      .phone__text {
        color: $c-orange !important;
      }
      path {
        fill: $c-orange !important;
      }
    }
  }

  &__search {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    cursor: pointer;
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

.main-header {
  background-color: transparent !important;
  .header__link {
    color: #fff;
  }
  .phone__text {
    color: #fff;
  }
  box-shadow: none !important;
}

.phone {
  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    pointer-events: none;
  }

  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    transition: 0.3s;
  }
}
</style>