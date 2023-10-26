<template>
  <div class="services">
    <v-overlay :value="$fetchState.pending" z-index="999999">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#EF7F1A"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <UiHeading class="services__title">{{ $t("header.services") }}</UiHeading>
      <div class="services__subtitle">{{ $t("services.description") }}</div>
      <div class="services__container">
        <div 
          class="services__service" 
          v-for="service in services" 
          :key="service.id"
          @click="$router.push(localePath(`/services/${service.id}`))"
        >
          <img :src="service.image" alt="service image" />
          <div class="service__overlay"></div>
          <div class="service__text">{{ service.name }}</div>
        </div>
      </div>
    </div>
    <SharedTickets />
    <SharedInstagram />
  </div>
</template>
<script>
export default {
  data() {
    return {
      services: []
    }
  },
  async fetch() {
    await this.getServices()
  },
  methods: {
    async getServices() {
      this.services = await this.$axios.$get('/services/')
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: '/'
        },
        {
          title: this.$t("header.services"),
          url: '/services'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.services {
  background-color: #F8FAFB;

  &__title {
    margin-bottom: 30px;
  }

  &__subtitle {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 30px;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 25px;
    row-gap: 30px;
    padding-bottom: 80px;
  }

  &__service {
    height: 470px;
    border-radius: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
}

.service {
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 10px;
    background: linear-gradient(1deg, rgba(0, 0, 0, 0.54) -16.13%, rgba(255, 255, 255, 0.00) 75.69%);
  }

  &__text {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    position: absolute;
    bottom: 30px;
    left: 31px;
    z-index: 2;
    color: #FFF;
  }
}
</style>