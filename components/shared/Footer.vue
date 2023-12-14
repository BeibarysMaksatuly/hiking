<template>
  <div class="footer">
    <div class="footer__data container-1">
      <Logo class="footer__logo" />
      <div class="footer__links">
        <nuxt-link
          v-for="(link, idx) in headerLinks"
          :to="localePath(link.to)"
          :key="idx"
          class="footer__link"
        >
          {{ link.name }}
        </nuxt-link>
      </div>
      <div class="footer__links" v-if="documents && documents.length">
        <nuxt-link :to="localePath('/documents')" class="contact__header">{{
          $t("header.document")
        }}</nuxt-link>
        <a
          v-for="document in documents.slice(0, 5)"
          :key="document.id"
          :href="document.file"
          class="footer__link"
          target="_blank"
        >
          {{ document.title }}
        </a>
      </div>
      <div class="footer__contact">
        <nuxt-link :to="localePath('/contacts')" class="contact__header">{{
          $t("header.contacts")
        }}</nuxt-link>
        <div class="contact__info">
          <a href="tel:+7 (707) 617 - 41 - 89">+7 (707) 617 - 41 - 89</a>
          <a href="mailto:kazcamping@gmail.com">kazcamping@gmail.com</a>
          <a
            href="https://2gis.kz/almaty/geo/9430047375134121?m=76.98372%2C43.299308%2F15.54"
            target="_blank"
            >{{ $t("footer.address") }}</a
          >
        </div>
        <div class="contact__socials">
          <a
            href="https://www.facebook.com/campinglife.kz?mibextid=LQQJ4d"
            target="_blank"
          >
            <Facebook class="socials__icon" />
          </a>
          <a href="" target="_blank">
            <Youtube class="socials__icon" />
          </a>
          <a
            href="https://instagram.com/campinglife.kz?igshid=enN5MWVnaG9mMWs="
            target="_blank"
          >
            <Instagram class="socials__icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from "icons/logo.svg?inline";
import Facebook from "icons/facebook.svg?inline";
import Instagram from "icons/instagram.svg?inline";
import Youtube from "icons/youtube.svg?inline";
export default {
  name: "SharedFooter",
  components: {
    Logo,
    Facebook,
    Instagram,
    Youtube,
  },
  data() {
    return {
      documents: [],
    };
  },
  watch: {
    locale() {
      this.$fetch();
    },
  },
  async fetch() {
    this.documents = await this.$axios.$get("/documents/");
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
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
  },
};
</script>
<style lang="scss" scoped>
a {
  &:hover {
    color: $c-orange;
  }
}
.container-1 {
  max-width: 1280px;
}
.footer {
  margin-top: auto;
  background-color: $c-white;
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.1);

  &__logo {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
  }

  &__data {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-top: 80px;
    padding-bottom: 90px;
    @include phone {
      flex-direction: column;
      gap: 40px;
      padding-top: 60px;
      padding-bottom: 54px;
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    @include phone {
      gap: 15px;
    }
  }

  &__link {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    cursor: pointer;

    &:hover {
      color: $c-orange;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.contact {
  &__header {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;

    div {
      cursor: pointer;
    }

    div:hover {
      color: $c-orange;
    }
  }

  &__socials {
    display: flex;
    gap: 12px;

    a {
      width: 40px;
      height: 40px;
      flex-shrink: 0;

      svg {
        width: 100%;
        height: 100%;
        color: $c-main;
        transition: 300ms linear all;
        &:hover {
          color: $c-orange;
        }
      }
    }
  }
}
</style>