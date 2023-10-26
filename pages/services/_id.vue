<template>
  <div class="service">
    <v-overlay :value="$fetchState.pending" z-index="999999">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#EF7F1A"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
      <UiBreadcrumbs :links="links" class="container-1" />
      <div class="service__hero">
        <img :src="service.image" alt="category image" />
      </div>
      <div class="container-1">
        <UiHeading class="service__title">{{ service.name }}</UiHeading>
        <div class="service__container">
          <client-only>
            <swiper :pagination="true"  class="adviceSwiper" :options="swiperOptions">
              <swiper-slide v-for="file in service.images" :key="file.id" class="service__photo">
                <img :src="file.image" alt="mini photo" />
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination" />
            </swiper>
          </client-only>
          <div class="service__text" v-html="service.text"></div>
        </div>
        <div class="service__other">
          <div class="category__title">{{ $t("services.otherServices") }}</div>
            <div class="category__data">
              <div 
                class="category__info" 
                v-for="info in otherServices" 
                :key="info.id"
                @click="$router.push(localePath(`/services/${info.id}`))"
              >
                <img :src="info.image" alt="info image" class="info__image" />
                <div class="category__overlay"></div>
                <div class="info__title">{{ info.name }}</div>
              </div>
            </div>
        </div>
      </div>
    <SharedTickets />
    <SharedInstagram />
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination])
export default {
  data() {
    return {
      service: {},
      otherServices: [],
      swiperOptions: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
          },
        },
    }
  },
  async fetch() {
    await this.getService()
    await this.getServiceExcluded()
  },
  methods: {
    async getService() {
      this.service = await this.$axios.$get(`/services/${this.id}/`)
    },
    async getServiceExcluded() {
      this.otherServices = await this.$axios.$get(`/service-exclude/`, { service_id: this.id })
      console.log(this.otherServices)
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
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
.adviceSwiper {
  width: 560px;
  @include phone {
    width: 100%;
  }
}
.service {
  background-color: #F8FAFB;

  &__title {
    margin-bottom: 40px;
  }

  &__hero {
    width: 100%;
    height: 400px;
    margin-bottom: 80px;

    @include phone {
      height: 150px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__container {
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding-bottom: 160px;
    @include phone {
      padding-bottom: 80px;
      flex-direction: column;
    }
  }

  &__photo {
    flex-shrink: 0;
    width: 100%;
    height: 552px;
    border-radius: 10px;
    @include phone {
      height: 150px;
    }
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__text {
    flex: 1 0 0;
    font-size: 20px;
    white-space: pre-line;
    font-style: normal;
    line-height: 24px;
  }
  &__other {
    padding-bottom: 80px;
  }
}

:deep(.swiper-pagination) {
  bottom: 20px;

  @include phone {
    bottom: 20px;
  }
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white ;
  opacity: 1;
}


.category {
  &__title {
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 33.6px */
    letter-spacing: 0.084px;
    margin-bottom: 40px;
    @include phone {
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 120%; /* 24px */
      letter-spacing: 0.06px;
    }
  }
  &__data {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 25px;
    row-gap: 30px;
    @include phone {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(1deg, rgba(0, 0, 0, 0.54) -16.13%, rgba(255, 255, 255, 0.00) 75.69%);
  }

  &__info {
    position: relative;
    background-color: #fff;
    height: 470px;
    border-radius: 10px;
    @include phone {
      height: 300px;
    }
  }
}

.info {
  &__title {
    color: #fff;
    position: absolute;
    bottom: 31px;
    left: 31px;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    @include phone {
      bottom: 20px;
      left: 10px;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 130%;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}
</style>