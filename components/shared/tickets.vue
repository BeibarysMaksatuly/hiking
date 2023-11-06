<template>
  <div class="tickets">
    <div class="container-1">
      <div class="tickets__data">
        <UiHeading class="data__title">
          {{ $t("main.tickets.buyTicketsTitle") }}
        </UiHeading>
        <div class="data__tabs">
          <div class="tabs__tabs">
            <div :class="['tabs__tab', tab == 1 && 'tabs__tab-active']" @click="tab = 1">Aviata</div>
            <div :class="['tabs__tab' , tab == 2 && 'tabs__tab-active']" @click="tab = 2">Aviasales</div>
          </div>
          <iframe 
            v-show="tab == 1"
            :src="`https://aviata.kz/static/widget/search/widget.html?lang=${locale}`" 
            class="data__iframe"
          />
          <div v-show="tab == 2" id="aviasales-widget-container"></div>
        </div>
      </div>
    </div>
    <div class="tickets__image">
      <img src="@/assets/images/tickets.png" alt="tickets" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1
    }
  },
  head: {
    script: [
      {
        src: 'https://tp.media/content?currency=usd&trs=279573&shmarker=498722&show_hotels=false&powered_by=false&locale=en&searchUrl=www.aviasales.com%2Fsearch&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&no_labels=&plain=false&promo_id=7879&campaign_id=100',
        charset: 'utf-8',
        async: true,
      },
    ],
  },
  mounted() {
    // Create a new script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://tp.media/content?currency=usd&trs=279573&shmarker=498722&show_hotels=false&powered_by=false&locale=${this.locale}&searchUrl=www.aviasales.com%2Fsearch&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&no_labels=&plain=false&promo_id=7879&campaign_id=100`;
    script.charset = 'utf-8';

    // Append the script to the container
    const container = document.getElementById('aviasales-widget-container');
    if (container) container.appendChild(script);
  },
  computed: {
    locale() {
      return this.$i18n.locale
    },
  }
}
</script>
<style lang="scss" scoped>
.tickets {
  position: relative;
  background-color: #FFF;

  &__data {
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    height: 880px;
    @include phone {
      width: 100%;
      padding-top: 264px;
      height: auto;
      padding-bottom: 50px;
    }
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 558px;
    height: 880px;
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
.container-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 102px;
  @include phone {
    flex-direction: column-reverse;
    gap: 0;
  }
}
.data {
  &__title {
    margin-bottom: 55px;
  }

  &__iframe {
    width: 100%; 
    min-width: 280px; 
    min-height: 500px;
    border: none; 
    overflow: hidden; 
    border-radius: 10px;
    @include phone {
      padding: 0;
    }
  }
  &__tabs {
    padding: 20px;
    width: 100%;
    background-color: #F8FAFB;
    border-radius: 10px;
    width: 600px;

    @include phone {
      width: 100%;
    }
  }
}

.tabs {
  &__tabs {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__tab {
    flex: 1;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: #7D92A1;

    &-active {
      color: #FFC107 !important;
      border-bottom: 2px solid #FFC107;
    }
  }
}
</style>