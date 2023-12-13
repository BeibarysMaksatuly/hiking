<template>
  <div class="tours container-1">
    <div class="tours__data">
      <div class="tours__title">
        {{ $t("main.tours.selectTour") }}
      </div>
      <!-- <div class="tours__subtitle">{{ $t("main.tours.selectCountry") }}</div>
      <div slot="button-prev" class="swiper-button-prev_tour">
        <Arrow />
      </div>
      <div slot="button-next" class="swiper-button-next_tour">
        <Arrow />
      </div> -->
    </div>
    <ServicesList :services="formats" @service-clicked="serviceClicked" />

    <!-- <client-only>
      <swiper ref="mySwiper" class="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="tour in tours"
          :key="tour.id"
          class="tour"
          @click.native="findTours(tour)"
        >
          <div class="tour__image">
            <img :src="tour.image" alt="tour image" />
          </div>
          <div class="tour__overlay"></div>
          <div class="tour__data">
            <div class="tour__name">{{ tour.name }}</div>
            <div class="tour__services">{{ tour.tours_count }} туров</div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only> -->
  </div>
</template>
<script>
import Swiper, { Navigation } from "swiper";
import Arrow from "icons/btn-left.svg?inline";
Swiper.use([Navigation]);
export default {
  components: {
    Arrow,
  },
  async fetch() {
    await this.getFormats();
  },
  data() {
    return {
      formats: [],
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 15,
        navigation: {
          nextEl: ".swiper-button-next_tour",
          prevEl: ".swiper-button-prev_tour",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          960: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        },
      },
    };
  },
  methods: {
    async getFormats() {
      this.formats = await this.$axios.$get("/formats/");
    },
    serviceClicked(serviceId) {
      this.$router.push(
        this.localeLocation({
          path: "/tours",
          query: {
            formats: serviceId,
          },
        })
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.tours {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  // padding-bottom: 80px;

  &__data {
    display: flex;
    flex-direction: column;
    position: relative;
    // margin-bottom: 50px;
    @include phone {
      // margin-bottom: 105px;
    }
  }

  &__title {
    color: #324552;
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.108px;
    margin-bottom: 40px;

    @include phone {
      margin-bottom: 37px;
      font-size: 24px;
    }
  }

  &__subtitle {
    text-align: center;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    letter-spacing: 0.24px;

    @include phone {
      font-size: 24px;
    }
  }
}
.container-1 {
  max-width: 1280px;
}
.tour {
  height: 470px;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px 0px rgba(18, 27, 33, 0.1);
    .tour__name,
    .tour__services {
      color: #ffc107;
    }
    .tour__overlay:before {
      opacity: 1;
    }
  }
  @include phone {
    height: 300px;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  &__data {
    position: absolute;
    z-index: 2;
    bottom: 30px;
    left: 30px;
    color: $c-white;
    @include phone {
      bottom: 10px;
      left: 10px;
    }
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    &:before {
      content: "";
      display: block;

      opacity: 0;
      transition: opacity 0.3s ease;

      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      border-radius: 10px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
    }
  }
  &__name {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    margin-bottom: 9px;
    transition: 0.3s;
    @include phone {
      font-size: 16px;
      line-height: 21px;
    }
  }
  &__services {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    opacity: 0.7;
    transition: 0.3s;
    @include phone {
      font-size: 14px;
      line-height: 130%;
    }
  }
}

.mySwiper {
  width: 100%;
}
.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}
.swiper-button-prev_tour.swiper-button-disabled,
.swiper-button-next_tour.swiper-button-disabled {
  opacity: 1;
  color: #dde1e6;
}
.swiper-button-prev_tour,
.swiper-button-next_tour {
  position: absolute;
  top: auto;
  left: auto;
  bottom: 0;
  right: 0;

  width: 35px;
  height: 35px;
  flex-shrink: 0;
  color: #fecc01;
  border-radius: 50%;
  cursor: pointer;
  @include phone {
    bottom: -55px;
  }
}
.swiper-button-next_tour {
  transform: rotate(180deg);
}

.swiper-button-prev_tour {
  right: 42px;
}
</style>