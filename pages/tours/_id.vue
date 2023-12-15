<template>
  <div class="tour">
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="tour__hero">
      <img :src="tour.main_image" alt="main image" />
      <div v-html="tour.main_image_text"></div>
    </div>
    <div class="tour__cont container-1">
      <UiHeading>{{ $t("tours.aboutTour") }}</UiHeading>
      <div class="tour__places">
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
          v-for="(format, idx) in tour.formats"
          :key="idx"
        >
          <div class="circle"></div>
          <div>{{ format.name }}</div>
        </div>
      </div>
      <div class="tour__text" v-html="tour.description"></div>
      <div class="tour__advantages" v-click-outside="hideShow">
        <p>Преимущества</p>
        <div>
          <div v-for="advantage in tour.advantages" :key="advantage.id">
            <v-tooltip bottom :value="show === advantage.id" max-width="257px">
              <template v-slot:activator="{ on }">
                <a @click="show = show === advantage.id ? null : advantage.id">
                  {{ advantage.title }}
                </a>
              </template>
              <div class="tooltip__text">
                {{ advantage.text }}
              </div>
            </v-tooltip>
          </div>
        </div>
      </div>
      <client-only>
        <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
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
      <div class="tour__info">
        <div class="tour__marsh">
          <Map class="tour__svg" />
          <p>{{ tour.route }}</p>
        </div>
      </div>
      <div class="tour__info">
        <div class="tour__marsh">
          <CreditCard class="tour__svg" />
          <div class="tour__titled">{{ $t("tours.prices") }}:</div>
        </div>
        <div class="tour__prices">
          <div class="tour__price" v-for="(td, idx) in tour.prices" :key="idx">
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
      <div class="tour__program">
        <div class="program__title">
          <UiHeading>{{ $t("tours.program") }}</UiHeading>
          <a @click="openAllProgramms = !openAllProgramms">
            {{ !openAllProgramms ? "Раскрыть все" : "Закрыть все" }}
          </a>
        </div>
        <UiBread
          v-for="(data, d) in tour.programs"
          :key="d + data.title"
          :id="d + data.title"
          :openAll="openAllProgramms"
        >
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
                <div
                  v-if="data.accommodation"
                  class="tour__marsh"
                  @click="selectAcc(data.accommodation)"
                >
                  <Home class="tour__svg" />
                  <div class="tour__titled">Где мы будем жить</div>
                </div>
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
      <div class="included_things" v-html="tour.included_things"></div>
      <div class="tour__info last">
        <div class="tour__marsh">
          <Calendar class="tour__svg" />
          <div class="tour__titled">Расписание туров</div>
        </div>
        <ul class="tour__data texti">
          <li v-for="date in tour.dates" :key="date.id">
            {{ formatDate(date.start_date) }} -
            {{ formatDate(date.end_date) }}
          </li>
        </ul>
      </div>
      <div class="tour__program">
        <div class="program__title">
          <UiHeading>{{ $t("tours.important") }}</UiHeading>
          <a @click="openAllMust = !openAllMust">
            {{ !openAllMust ? "Раскрыть все" : "Закрыть все" }}
          </a>
        </div>
        <UiBread
          v-for="(data, i) in tour.must_know"
          :key="i + data.title"
          :id="i + data.title"
          :openAll="openAllMust"
        >
          <template #title>{{ data.title }}</template>
          <template #data>
            <div class="must_know-desc">
              {{ data.text }}
            </div>
          </template>
        </UiBread>
      </div>
      <div v-if="tour.reviews.length" class="reviews">
        <div class="reviews__title">
          <div class="circle"></div>
          {{ tour.reviews.length }} отзывов
        </div>
        <div class="reviews__line"></div>
        <div class="reviews__info">
          <div
            class="review"
            v-for="(review, idx) in tour.reviews"
            :key="review.id"
            v-show="showAllReviews || idx < 4"
          >
            <div class="review__header">
              <img :src="review.image" alt="" />
              <div>
                <p>{{ review.author }}</p>
                <p>{{ review.author_age }} лет</p>
              </div>
            </div>
            <div class="review__text">
              {{ review.text }}
            </div>
          </div>
        </div>
        <div
          v-if="tour.reviews.length > 4"
          class="reviews__more"
          @click="toggleReviews"
        >
          {{ showAllReviews ? "Скрыть все отзывы" : "Посмотреть все отзывы" }}
        </div>
      </div>
    </div>
    <SharedForm />
    <ToursModalAcc
      v-if="currentAcc"
      :acc="currentAcc"
      :modalOpen="modalOpen"
      @close-modal="modalOpen = false"
    />
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
import Map from "@/assets/icons/map-1.svg?inline";
import Calendar from "@/assets/icons/calendar-1.svg?inline";
import CreditCard from "@/assets/icons/credit-card-1.svg?inline";
import Location from "@/assets/icons/location.svg?inline";
import Food from "@/assets/icons/food.svg?inline";
import Home from "@/assets/icons/home.svg?inline";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
import vClickOutside from "v-click-outside";
export default {
  components: {
    Map,
    Calendar,
    CreditCard,
    Location,
    Food,
    Home,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  async fetch() {
    await this.getTour();
  },
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
      show: null,
      openAllProgramms: false,
      openAllMust: false,
      showAllReviews: false,
      currentAcc: null,
      modalOpen: false,
    };
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
  methods: {
    async getTour() {
      this.tour = await this.$axios.$get(
        `/tours/detail/${this.$route.params.id}`
      );
    },
    formatDate(dateString) {
      const locale = this.$i18n.locale; // Получение текущей локали
      const options = { month: "short", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, options);
    },
    hideShow() {
      this.show = null;
    },
    toggleReviews() {
      this.showAllReviews = !this.showAllReviews;
    },
    selectAcc(acc) {
      this.currentAcc = acc;
      this.modalOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.tour {
  &__hero {
    position: relative;
    width: 100%;
    height: 520px;
    margin-bottom: 80px;
    @include phone {
      height: 350px;
      margin-bottom: 40px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    div {
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      color: #fff;
      text-align: center;
      text-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
    }
  }

  &__cont {
    display: flex;
    flex-direction: column;
  }

  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 32px;
    margin-bottom: 40px;
    @include phone {
      margin: 16px 0;
    }
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
  }

  &__text {
    font-size: 20px;
    line-height: 24px;
    white-space: pre-line;
    margin-bottom: 58px;
    @include phone {
      margin-bottom: 40px;
    }
  }

  &__advantages {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
    @include phone {
      margin-bottom: 40px;
    }
    p {
      color: #324552;
      font-size: 20px;
      font-style: normal;
      font-weight: 800;
      line-height: 24px;
      margin-bottom: 24px;
      @include phone {
        font-size: 18px;
      }
    }
    div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 50px;
      @include phone {
        gap: 16px;
        display: grid;
        @media (max-width: 430px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
    a {
      width: 188px;

      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: #06d;

      padding: 12px;
      border-radius: 8px;
      background: transparent;
      border: 1px solid #06d;
      cursor: pointer;
      transition: 0.3s;

      @include phone {
        width: 100%;
      }
      &:hover {
        border: 1px solid white;
        background: #06d;
        color: white;
      }
    }
  }

  .swiper {
    width: 100%;
    height: 421px;
    border-radius: 10px;
    margin-bottom: 36px;

    @include phone {
      width: 100%;
      height: 300px;
      margin-bottom: 55px;
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
    @include phone {
      margin-bottom: 20px;
      &:nth-of-type(7) {
        margin-bottom: 0;
      }
    }
  }

  &__marsh {
    display: grid;
    align-items: center;
    grid-template-columns: 64px 1fr;
    gap: 16px;
    color: #324552;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    @include phone {
      font-size: 16px;
      grid-template-columns: 32px 1fr;
    }
  }

  &__svg {
    width: 64px;
    height: 64px;
    padding: 12px;
    background: #fff;
    border-radius: 38px;
    box-shadow: 0px -1px 15px 0px rgba(105, 112, 117, 0.2);
    @include phone {
      width: 32px;
      height: 32px;
      padding: 7px;
    }
  }

  &__titled {
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
    @include phone {
      font-size: 16px;
    }
  }

  &__prices {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-left: 84px;
    @include phone {
      gap: 12px;
      margin-top: 16px;
      margin-left: 50px;
    }
  }

  &__price {
    display: grid;
    grid-template-columns: 25px 1fr;
    gap: 10px;
    @include phone {
      grid-template-columns: 20px 1fr;
      gap: 14px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__number-data {
    display: flex;
    flex-direction: column;
    gap: 10px;
    @include phone {
      gap: 3px;
    }
  }

  &__data-price {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    @include phone {
      font-size: 14px;
      line-height: 20px;
    }
  }

  &__data-discount {
    color: #dc3545;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    @include phone {
      font-size: 12px;
    }
  }

  &__data-descr {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    white-space: pre-line;
    @include phone {
      font-size: 12px;
      line-height: 20px;
    }
  }

  &__program {
    display: flex;
    flex-direction: column;
    margin-top: 55px;
    @include phone {
      margin-top: 44px;
    }
  }

  .last {
    margin-bottom: 0;
  }
  .texti {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 84px;

    height: 198px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    @include phone {
      height: 158px;
      margin-left: 0px;
      margin-top: 16px;
    }
  }
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
  gap: 35px;
  margin-bottom: 40px;
  @include phone {
    display: flex;
    flex-direction: column;
    grid-template-columns: unset;
    gap: 20px;
    margin-bottom: 20px;
  }
  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    @include phone {
      align-items: center;
      margin-bottom: 20px;
    }
    a {
      color: #06d;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      @include phone {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
  &__cont {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-left: 5px;
    @include phone {
      gap: 12px;
    }
  }

  &__swiper {
    width: 348px;
    height: 345px;
    border-radius: 10px;
    @include phone {
      width: 100%;
      height: 300px;
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
    @include phone {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
    }
  }

  &__text {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    @include phone {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }

  .tour__marsh {
    margin-top: auto;
    cursor: pointer;
  }
  .tour__titled {
    font-weight: 700;
  }
}

.included_things {
  font-size: 16px;
  line-height: 24px;
  margin-top: 15px;
  margin-bottom: 52px;
  @include phone {
    font-size: 14px;
    line-height: 20px;
    margin-top: 20px;
    margin-bottom: 40px;
  }
}

.must_know-desc {
  color: #324552;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */
  letter-spacing: 0.06px;
  margin-bottom: 40px;
  @include phone {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 20px;
  }
}

.reviews {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  @include phone {
    margin-bottom: 60px;
  }
  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: #324552;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.06px;
    .circle {
      margin-right: 12px;
    }
  }
  &__line {
    height: 1px;
    flex-shrink: 0;
    width: 100%;
    background: #ef7f1a;
    margin-top: 24px;
    margin-bottom: 28px;
    @include phone {
      margin-top: 12px;
    }
  }
  &__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px 22px;
    @include phone {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  &__more {
    color: #324552;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-decoration-line: underline;
    margin-top: 20px;
    cursor: pointer;
  }
}

.review {
  display: flex;
  flex-direction: column;
  gap: 19px;
  @include phone {
    gap: 12px;
  }
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 52px;
      height: 52px;
      border-radius: 232px;
      object-fit: cover;
      margin-right: 12px;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      p {
        color: #324552;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        &:last-of-type {
          font-weight: 400;
        }
      }
    }
  }
  &__text {
    color: #324552;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
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
  @include phone {
    width: 25px !important;
    height: 25px !important;
    svg {
      width: 25px !important;
      height: 25px !important;
    }
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

.tooltip__text {
  color: #000 !important;
  font-size: 18px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
}
</style>