<template>
  <div class="footer">
    <div class="container-1">
      <div class="footer__data">
        <Logo class="footer__logo" />
        <div class="footer__links">
          <nuxt-link 
            v-for="(link, idx) in headerLinks" 
            :to="link.to"
            :key="idx" 
            class="footer__link">
            {{ link.name }}
          </nuxt-link>
        </div>
        <div class="footer__contact">
          <div class="contact__header">Контакты</div>
          <div class="contact__info">
            <div>+7 712 333 33 33</div>
            <div>Байзакова, 280</div>
          </div>
          <div class="contact__socials">
            <a href="" target="_blank">
              <Facebook class="socials__icon" />
            </a>
            <a href="" target="_blank">
              <Linkedin class="socials__icon" />
            </a>
            <a href="" target="_blank">
              <Youtube class="socials__icon" />
            </a>
            <a href="" target="_blank">
              <Instagram class="socials__icon" />
            </a>
          </div>
        </div>
      </div>
      <div class="footer__line"></div>
      <a class="footer__policy" href="" target="_blank">Положение о конфиденциальности</a>
    </div>
  </div>
</template>
<script>
import Logo from 'icons/logo.svg?inline';
import Facebook from 'icons/facebook.svg?inline';
import Instagram from 'icons/instagram.svg?inline';
import Linkedin from 'icons/linkedin.svg?inline';
import Youtube from 'icons/youtube.svg?inline';
export default {
  name: 'SharedFooter',
  components: {
    Logo, Facebook, Instagram, Linkedin, Youtube
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
.footer {
  margin-top: auto;
  background-color: $c-white;
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.10);

  &__logo {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
  }

  &__data {
    display: flex;
    align-items: flex-start;
    gap: 160px;
    margin-bottom: 20px;
    @include phone {
      flex-direction: column;
      gap: 40px;
      margin-bottom: 0;
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
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__line {
    width: 100%;
    height: 1px;
    flex-shrink: 0;
    background-color: $c-main;
  }

  &__policy {
    margin-left: auto;
    line-height: 22px; /* 122.222% */
    text-decoration-line: underline;
  }
}

.container-1 {
  padding-top: 80px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @include phone {
    padding-top: 60px;
    padding-bottom: 54px;
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
      }
    }
  }
}
</style>