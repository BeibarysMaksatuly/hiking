<template>
  <div class="service">
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="service__hero">
      <img :src="service.detail_image" alt="category image" />
      <p class="container-1">{{ service.description }}</p>
    </div>
    <div class="container-1">
      <UiHeading class="service__title">{{ service.name }}</UiHeading>
      <div class="service__container">
        <client-only>
          <swiper
            :pagination="true"
            class="adviceSwiper"
            :options="swiperOptions"
          >
            <swiper-slide
              v-for="file in service.images"
              :key="file.id"
              class="service__photo"
            >
              <img :src="file.image" alt="mini photo" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" />
          </swiper>
        </client-only>
        <div class="service__text" v-html="service.text"></div>
      </div>
      <h4>{{ $t("services.otherServices") }}</h4>
      <ServicesList :services="otherServices" />
    </div>
    <SharedTickets />
    <SharedInstagram />
    <v-overlay :value="$fetchState.pending" z-index="999999">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#EF7F1A"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
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
    };
  },
  async fetch() {
    await this.getService();
    await this.getServiceExcluded();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: "/",
        },
        {
          title: this.$t("header.services"),
          url: "/services",
        },
      ];
    },
  },
  methods: {
    async getService() {
      this.service = await this.$axios.$get(`/services/${this.id}/`);
    },
    async getServiceExcluded() {
      this.otherServices = await this.$axios.$get(`/service-exclude/`, {
        service_id: this.id,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.service {
  background-color: #f8fafb;
  &__hero {
    position: relative;
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
    p {
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      color: #fff;
      text-align: center;
      font-size: 60px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      @include phone {
        font-size: 30px;
      }
    }
  }

  &__title {
    margin-bottom: 40px;
  }

  &__container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 160px;
    @include phone {
      flex-direction: column;
      gap: 40px;
      padding-bottom: 80px;
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
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }
  &__text {
    width: 100%;
    max-width: 560px;
    white-space: pre-line;
    @include phone {
      max-width: 100%;
    }
  }
  h4 {
    color: #11142d;
    font-size: 42px;
    font-weight: 700;
    line-height: 120%;
    letter-spacing: 0.126px;
    margin-bottom: 40px;
    @include phone {
      font-size: 24px;
    }
  }
}

.adviceSwiper {
  width: 560px;
  @include phone {
    width: 100%;
  }
}
:deep(.swiper-pagination) {
  bottom: 20px;
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 1;
}
</style>