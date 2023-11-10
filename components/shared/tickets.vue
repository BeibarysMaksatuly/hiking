<template>
  <div class="tickets">
    <div class="container-1">
      <div class="tickets__data">
        <UiHeading class="data__title">
          {{ $t("main.tickets.buyTicketsTitle") }}
        </UiHeading>
        <div id="aviasales-widget-container"></div>
      </div>
    </div>
    <div class="tickets__image">
      <img
        v-if="!mobileViewSwiper"
        src="@/assets/images/tickets.png"
        alt="tickets"
      />
      <img v-else src="@/assets/images/tickets_mobile.png" alt="tickets" />
    </div>
  </div>
</template>

<script>
import widthAdapter from "~/mixins/widhtAdapter";
export default {
  mixins: [widthAdapter],
  head: {
    script: [
      {
        src: "https://tp.media/content?currency=kzt&trs=282557&shmarker=502336&searchUrl=www.aviasales.ru%2Fsearch&locale=ru&powered_by=true&one_way=false&only_direct=false&period=current_month&range=7%2C14&primary=%230C73FE&color_background=%23ffffff&dark=%23000000&light=%23FFFFFF&achieve=%2345AD35&promo_id=4041&campaign_id=100",
        charset: "utf-8",
        async: true,
      },
    ],
  },
  mounted() {
    // Create a new script element
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://tp.media/content?currency=kzt&trs=282557&shmarker=502336&searchUrl=www.aviasales.ru%2Fsearch&locale=${this.locale}&powered_by=true&one_way=false&only_direct=false&period=current_month&range=7%2C14&primary=%230C73FE&color_background=%23ffffff&dark=%23000000&light=%23FFFFFF&achieve=%2345AD35&promo_id=4041&campaign_id=100`;
    script.charset = "utf-8";

    // Append the script to the container
    const container = document.getElementById("aviasales-widget-container");
    if (container) container.appendChild(script);
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
};
</script>

<style lang="scss" scoped>
.tickets {
  position: relative;
  background-color: #fff;

  &__data {
    width: 59.5%;
    display: flex;
    flex-direction: column;
    padding: 50px 0;
    .data__title {
      margin-bottom: 40px;
    }
    @include phone {
      width: 100%;
      height: auto;
      padding: 265px 0 80px 0;
    }
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 38.75%;
    height: 100%;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @include phone {
      height: 214.325px;
      width: 100%;
      bottom: auto;
      top: 0;
    }
  }
}
</style>