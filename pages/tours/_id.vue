<template>
  <div class="tour">
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="tour__cont">
      <div class="tour__hero">
        <img :src="tour.main_image" alt="main image" />
        <p>{{ tour.name }}</p>
      </div>
      <UiHeading class="container-1">{{ $t("tours.aboutTour") }}</UiHeading>
      <div class="tour__places container-1">
        <div
          class="tour__place"
          v-for="country in tour.country"
          :key="country.id"
        >
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
        <div
          class="tour__place tour__place--green"
          v-for="(tag, idx) in tour.tags"
          :key="idx"
        >
          <div class="circle"></div>
          <div>{{ tag.name }}</div>
        </div>
      </div>
      <div class="tour__text container-1" v-html="tour.description"></div>
      <div class="tour__advantages container-1">
        <p>Преимущества</p>
        <div>
          <a v-for="advantage in tour.advantages" :key="advantage.id">
            {{ advantage.title }}
          </a>
        </div>
      </div>
      <client-only>
        <swiper
          ref="mySwiper"
          class="swiper container-1"
          :options="swiperOptions"
        >
          <swiper-slide v-for="image in tour.images" :key="image.id">
            <img :src="image.image" alt="mini photo" />
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                fill="#DDE1E6"
                fill-opacity="0.2"
              />
              <path
                d="M13.8047 7.52876C14.0651 7.78911 14.0651 8.21122 13.8047 8.47157L10.2761 12.0002L13.8047 15.5288C14.0651 15.7891 14.0651 16.2112 13.8047 16.4716C13.5444 16.7319 13.1223 16.7319 12.8619 16.4716L8.86193 12.4716C8.60158 12.2112 8.60158 11.7891 8.86193 11.5288L12.8619 7.52876C13.1223 7.26841 13.5444 7.26841 13.8047 7.52876Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div slot="button-next" class="swiper-button-next">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="12"
                transform="matrix(-1 0 0 1 24 0)"
                fill="#DDE1E6"
                fill-opacity="0.2"
              />
              <path
                d="M10.1953 16.4712C9.93491 16.2109 9.93491 15.7888 10.1953 15.5284L13.7239 11.9998L10.1953 8.47124C9.93491 8.21089 9.93491 7.78878 10.1953 7.52843C10.4556 7.26808 10.8777 7.26808 11.1381 7.52843L15.1381 11.5284C15.3984 11.7888 15.3984 12.2109 15.1381 12.4712L11.1381 16.4712C10.8777 16.7316 10.4556 16.7316 10.1953 16.4712Z"
                fill="white"
              />
            </svg>
          </div>
        </swiper>
      </client-only>
      <div class="tour__info container-1">
        <div class="tour__marsh">
          <Map class="tour__svg" />
          {{ tour.route }}
        </div>
      </div>
      <div class="tour__info container-1">
        <div class="tour__marsh">
          <CreditCard class="tour__svg" />
          <div class="tour__titled">{{ $t("tours.prices") }}:</div>
        </div>
        <div class="tour__prices">
          <div class="tour__price" v-for="(td, idx) in tour.prices" :key="idx">
            <div class="tour__number">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M20.5 6L9.5 17L4.5 12"
                  stroke="#0066DD"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="tour__number-data">
              <div
                class="tour__data-price"
                :style="{ color: td.discount_till_date ? '#dc3545' : '' }"
              >
                {{ td.price }} {{ td.currency }}
              </div>
              <div v-if="td.discount_till_date" class="tour__data-discount">
                Промоакция до {{ td.discount_till_date }}
              </div>
              <div class="tour__data-descr" v-html="td.text"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="tour__program container-1">
        <UiHeading class="program__title">{{ $t("tours.program") }}</UiHeading>
        <UiBread v-for="(data, d) in tour.programs" :key="d" :id="d">
          <template #title
            >{{ data.day }} {{ $t("tours.day") }}. {{ data.title }}</template
          >
          <template #data>
            <div class="program">
              <div class="program__cont">
                <div class="program__road">
                  <div>{{ data.route }}</div>
                </div>
                <div class="program__road">
                  <div>{{ data.food }}</div>
                </div>
                <div class="program__text">{{ data.description }}</div>
              </div>
              <client-only>
                <swiper
                  ref="programSwiper"
                  class="program__swiper"
                  :options="swiperOptions2"
                >
                  <swiper-slide v-for="image in data.images" :key="image.id">
                    <img :src="image.image" alt="mini photo" />
                  </swiper-slide>
                  <div slot="button-prev" class="swiper-button-prev">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill="#DDE1E6"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M13.8047 7.52876C14.0651 7.78911 14.0651 8.21122 13.8047 8.47157L10.2761 12.0002L13.8047 15.5288C14.0651 15.7891 14.0651 16.2112 13.8047 16.4716C13.5444 16.7319 13.1223 16.7319 12.8619 16.4716L8.86193 12.4716C8.60158 12.2112 8.60158 11.7891 8.86193 11.5288L12.8619 7.52876C13.1223 7.26841 13.5444 7.26841 13.8047 7.52876Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div class="swiper-pagination" slot="pagination"></div>
                  <div slot="button-next" class="swiper-button-next">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        transform="matrix(-1 0 0 1 24 0)"
                        fill="#DDE1E6"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M10.1953 16.4712C9.93491 16.2109 9.93491 15.7888 10.1953 15.5284L13.7239 11.9998L10.1953 8.47124C9.93491 8.21089 9.93491 7.78878 10.1953 7.52843C10.4556 7.26808 10.8777 7.26808 11.1381 7.52843L15.1381 11.5284C15.3984 11.7888 15.3984 12.2109 15.1381 12.4712L11.1381 16.4712C10.8777 16.7316 10.4556 16.7316 10.1953 16.4712Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </swiper>
              </client-only>
            </div>
          </template>
        </UiBread>
      </div>

      <div class="tour__info container-1">
        <div class="tour__marsh">
          <Calendar class="tour__svg" />
          <div class="tour__titled">Расписание туров</div>
        </div>
        <ul class="tour__data texti">
          <li v-for="(tt, idx) in tour.dates" :key="idx">
            {{ tt.start_date }} - {{ tt.end_date }}
          </li>
        </ul>
      </div>
    </div>
    <div class="tour__need">
      <div class="container-1">
        <UiHeading>{{ $t("tours.important") }}</UiHeading>
        <div class="need__text">{{ tour.must_know }}</div>
      </div>
    </div>
    <v-overlay :value="$fetchState.pending" z-index="999999">
      <v-progress-circular
        :size="70"
        :width="7"
        color="#EF7F1A"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <SharedForm />
  </div>
</template>

<script>
import Map from "@/assets/icons/map-1.svg?inline";
import Calendar from "@/assets/icons/calendar-1.svg?inline";
import CreditCard from "@/assets/icons/credit-card-1.svg?inline";
import Swiper, { Navigation, Pagination } from "swiper";
import Location from "@/assets/icons/location.svg?inline";
import Food from "@/assets/icons/food.svg?inline";
Swiper.use([Navigation, Pagination]);
export default {
  data() {
    return {
      tour: {},
      swiperOptions: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
      swiperOptions2: {
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      },
    };
  },
  components: {
    Map,
    Calendar,
    CreditCard,
    Location,
    Food,
  },
  async fetch() {
    await this.getTour();
  },
  methods: {
    async getTour() {
      this.tour = await this.$axios.$get(
        `/tours/detail/${this.$route.params.id}`
      );
    },
  },
  computed: {
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: "/",
        },
        {
          title: this.$t("header.tours"),
          url: "/tours",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.tour {
  &__cont {
    display: flex;
    flex-direction: column;
  }

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
      text-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
      font-size: 60px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      @include phone {
        font-size: 30px;
      }
    }
  }

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 32px;
    margin-bottom: 40px;
  }

  &__place {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #324552;

    padding: 4px 12px;
    gap: 5px;
    border-radius: 10px;
    background: #f9f9f9;
    &--green {
      background: #f0fff4 !important;
    }

    @include phone {
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }
  }

  &__text {
    font-size: 20px;
    line-height: 24px;
    white-space: pre-line;
    margin-bottom: 58px;
  }

  &__advantages {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
    p {
      color: #324552;
      font-size: 20px;
      font-style: normal;
      font-weight: 800;
      line-height: 24px;
      margin-bottom: 24px;
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 50px;
    }
    a {
      color: #06d;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;

      padding: 12px;
      border-radius: 8px;
      border: 1px solid #06d;
    }
  }

  .swiper {
    width: 100%;
    height: 421px;
    border-radius: 10px;
    margin-bottom: 36px;

    @include phone {
      width: 100%;
      height: 180px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 25px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__marsh {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__svg {
    // flex-shrink: 0;
    width: 64px;
    height: 64px;
    padding: 12px;
    background: #fff;
    border-radius: 38px;
    box-shadow: 0px -1px 15px 0px rgba(105, 112, 117, 0.2);
  }

  &__titled {
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
  }

  &__double {
    display: flex;
    flex-direction: row;
    gap: 40px;
    @include phone {
      flex-direction: column;
    }
  }

  &__prices {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__price {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: flex-start;
    margin-left: 84px;
  }

  &__number {
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    color: #7d92a1;
  }

  &__number-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__data-price {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    // color: $c-yellow;
  }

  &__data-discount {
    color: #dc3545;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  &__data-descr {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    white-space: pre-line;
  }

  .texti {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-left: 84px;
  }

  &__program {
    display: flex;
    flex-direction: column;
    // gap: 40px;
    margin-top: 55px;
    padding-bottom: 52px;
  }

  &__need {
    background-color: #fff;

    > .container-1 {
      display: flex;
      flex-direction: column;
      gap: 40px;
      padding-top: 80px;
      padding-bottom: 80px;
    }
  }
}

.container-1 {
  max-width: 1280px;
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.6);
}

.program {
  display: grid;
  grid-template-columns: 1fr 348px;
  gap: 37px;
  &__title {
    margin-bottom: 40px;
  }

  &__cont {
    // width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__swiper {
    width: 348px;
    height: 345px;
    border-radius: 10px;
    margin-bottom: 36px;

    @include phone {
      width: 100%;
      height: 180px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  &__road {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__svg {
    display: flex;
    width: 64px;
    height: 64px;
    padding: 13px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    background: #fff;
  }

  &__text {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }

  &__line {
    height: 1px;
    flex-shrink: 0;
    width: 100%;
    background: #dde1e6;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}

.need__text {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.5;
}
.swiper-button-prev,
.swiper-button-next {
  width: 40px !important;
  height: 40px !important;
  svg {
    width: 40px !important;
    height: 40px !important;
  }
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  left: 16px;
}
.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  right: 16px;
}
:deep(.swiper-pagination-bullet-active) {
  background: $c-orange !important;
}
:deep(.swiper-pagination-bullet) {
  background: $c-white;
  opacity: 1;
}
</style>