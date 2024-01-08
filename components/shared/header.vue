<template>
  <div class="header">
    <div class="container-1">
      <nuxt-link to="/">
        <img src="@/assets/icons/logo.png" alt="" class="header__logo" />
      </nuxt-link>
      <div class="header__links" v-if="input">
        <nuxt-link
          v-for="(link, idx) in headerLinks"
          :to="localePath(link.to)"
          :key="idx"
          class="header__link"
          :class="{
            'active-link': isActiveLink(link),
          }"
        >
          {{ link.name }}
        </nuxt-link>
      </div>
      <transition name="search">
        <div v-if="!input" class="hey" v-click-outside="hideInput">
          <v-text-field
            v-model="search"
            :placeholder="$t('others.search')"
            solo
            dense
            hide-details=""
            height="46"
            append-icon="mdi-magnify"
            :background-color="
              isMain && !(scrollPosition > 600) ? '#F8FAFB' : '#F6F8FA'
            "
          ></v-text-field>
          <UiButton @click.native="searchYandex">{{
            $t("header.done")
          }}</UiButton>
        </div>
      </transition>

      <Search class="header__search" v-if="input" @click="showInput" />
      <a class="header__phone" v-if="input" href="tel:+7 (707) 617 - 41 - 89">
        <Call class="phone__icon" />
        <div class="phone__text">+7 (707) 617 - 41 - 89</div>
      </a>
      <Drag class="header__drag" v-if="input" @click="$emit('open-mobile')" />
      <UiSelect
        v-if="input"
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
  props: {
    isMain: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Logo,
    Search,
    Call,
    Drag,
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
    isActiveLink() {
      return (link) => {
        const currentPath = this.$route.path;
        const languagePrefix =
          this.$i18n.locale === this.$i18n.defaultLocale
            ? ""
            : `/${this.$i18n.locale}`;

        if (link.to === "/") {
          return (
            currentPath === languagePrefix ||
            currentPath === `${languagePrefix}/`
          );
        }

        return currentPath.startsWith(`${languagePrefix}${link.to}`);
      };
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
};
</script>

<style lang="scss" scoped>
.active-link {
  &:after {
    width: 100% !important;
  }
}
svg {
  cursor: pointer;
  path {
    transition: fill 0.3s ease;
  }
  &:hover {
    path {
      fill: #ef9b15 !important;
    }
  }
}

.container-1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  gap: 40px;
  max-width: 1280px;
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
    @include phone {
      width: 26px;
      height: 26px;
      margin-top: 5px;
    }
  }

  &__links {
    display: flex;
    gap: 40px;
    align-items: center;
    flex: 1 0 0;

    @media (max-width: 1140px) {
      gap: 0px;
      justify-content: space-between;
    }
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
    position: relative;
    color: #000;
    &:after {
      width: 0;
      height: 5px;
      display: block;
      position: absolute;
      bottom: -10px;
      left: 0;
      background: url("@/assets/images/wave-white1.svg") repeat-x;
      transition: 0.3s;
      content: "";
    }
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }

  &__lang {
    width: 63px !important;
    @include phone {
      display: none !important;
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
        color: #ef9b15 !important;
      }
      path {
        fill: #ef9b15 !important;
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

.hey {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex: 1;
  align-items: center;

  button {
    width: max-content;
    height: 46px;
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
    text-align: center;
    @include phone {
      height: 39px;
      font-size: 16px;
    }
  }
}
.search-enter-active {
  transition: all 0.3s linear;
}
.search-leave {
  opacity: 0;
  position: absolute;
  display: none;
}
.search-enter {
  transform: translateY(-70px);
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