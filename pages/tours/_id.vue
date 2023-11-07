<template>
  <div class="tour">
    <v-overlay :value="$fetchState.pending" z-index="999999">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#EF7F1A"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="tour__cont">
      <div class="tour__hero">
        <img :src="tour.main_image" alt="main image" class="tour__image" />
        <div class="tour__title">{{ tour.name }}</div>
      </div>
      <UiHeading class="tour__heading container-1">{{ $t("tours.aboutTour") }}</UiHeading>
      <div class="tour__places container-1">
        <div class="tour__place" v-for="country in tour.country" :key="country.id">
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
        <div class="tour__place tour__place--green" v-for="(tag, idx) in tour.tags" :key="idx">
          <div class="circle--green"></div>
          <div>{{ tag.name }}</div>
        </div>
      </div>
      <div class="tour__text container-1" v-html="tour.description"></div>
      <div class="container-1 tour__images">
        <img v-for="(image, idx) in tour.images" :key="idx" :src="image.image" alt="image" />
      </div>
      <div class="tour__info container-1">
        <div class="tour__marsh">
          <Map class="tour__svg" />
          <div class="tour__titled">{{ $t("tours.marshrut") }}:</div>
        </div>
        <div class="tour__data">
          {{ tour.route }}
        </div>
      </div>
      <div class="tour__double container-1">
        <div class="tour__info">
          <div class="tour__marsh">
            <CreditCard class="tour__svg" />
            <div class="tour__titled">{{ $t("tours.prices") }}:</div>
          </div>
          <div class="tour__prices">
            <div class="tour__price" v-for="(td, idx) in tour.prices" :key="idx">
              <div class="tour__number">{{ idx + 1 }}</div>
              <div class="tour__number-data">
                <div class="tour__data-price">{{ td.price }} {{ td.currency }}</div>
                <div class="tour__data-descr">{{ td.text }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="tour__info">
          <div class="tour__marsh">
            <Calendar class="tour__svg" />
            <div class="tour__titled">{{ $t("tours.dates") }}:</div>
          </div>
          <ul class="tour__data texti">
            <li v-for="(tt, idx) in tour.dates" :key="idx">
              {{ tt.start_date }} - {{ tt.end_date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tour__program container-1">
      <UiHeading class="program__title">{{ $t("tours.program") }}</UiHeading>
      <div class="program__data">
        <UiBread v-for="(data,d) in tour.programs" :key="d">
          <template #title>{{ data.day }} {{ $t("tours.day") }}</template>
          <template #data>
            <div class="program__cont">
              <client-only>
                <swiper :pagination="true"  class="program__swiper" :options="swiperOptions">
                  <swiper-slide v-for="(file, idd) in data.images" :key="idd" class="program__photo">
                    <img :src="file.image" alt="mini photo" />
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination" />
                </swiper>
              </client-only>
              <div class="program__road">
                <Location class="program__svg" />
                <div>{{ data.route }}</div>
              </div>
              <div class="program__road">
                <Food class="program__svg" />
                <div>{{ data.food }}</div>
              </div>
              <div class="program__text">{{ data.description }}</div>
            </div>
          </template>
          <template #line v-if="d + 1 !== tour.programs.length">
            <div class="program__line"></div>
          </template>
        </UiBread>
      </div>
    </div>
    <div class="tour__need">
      <div class="container-1">
        <UiHeading class="need__title">{{ $t("tours.important") }}</UiHeading>
        <div class="need__text">{{ tour.must_know }}</div>
      </div>
    </div>
    <SharedForm />
    <SharedTickets />
    <SharedInstagram />
  </div>
</template>
<script>
import Map from '@/assets/icons/map-1.svg?inline';
import Calendar from '@/assets/icons/calendar-1.svg?inline';
import CreditCard from '@/assets/icons/credit-card-1.svg?inline';
import Swiper, { Navigation, Pagination } from 'swiper';
import Location from '@/assets/icons/location.svg?inline';
import Food from '@/assets/icons/food.svg?inline';
Swiper.use([Navigation, Pagination])
export default {
  data() {
    return {
      tour: {},
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
  components: {
    Map, Calendar, CreditCard, Location, Food
  },
  async fetch() {
    await this.getTour()
  },
  methods: {
    async getTour() {
      this.tour = await this.$axios.$get(`/tours/detail/${this.$route.params.id}`)
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
          title: this.$t("header.tours"),
          url: '/tours'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>

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
.program {

  &__line {
    height: 1px;
    flex-shrink: 0;
    width: 100%;
    background: #DDE1E6;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  &__svg {
    display: flex;
    width: 64px;
    height: 64px;
    padding: 13px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;border-radius: 200px;
    background: #FFF;
  }

  &__text {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  &__cont {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &__swiper {
    width: 100%;
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
  &__photo {
    width: 100%;
    height: 300px;
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
}

.need {
  &__text {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; 
  }
}
.tour {
  background-color: #F8FAFB;

  &__need {
    background-color: #FFF;

    > .container-1 {
      display: flex;
      flex-direction: column;
      gap: 40px;
      padding-top: 80px;
      padding-bottom: 80px;
    }
  }

  &__program {
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding-bottom: 80px;
  }
  &__hero {
    width: 100%;
    height: 400px;
    position: relative;
    margin-bottom: 40px;
    @include phone {
      height: 150px;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

    &__title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      text-align: center;
      text-shadow: 0px 10px 20px rgba(0, 0, 0, 0.50);
      font-size: 60px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;

      @include phone {

      }
    }
    &__cont {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @include phone {
      gap: 5px;
    }
  }

  &__place  {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 10px;
    border: 2px solid rgba(239, 127, 26, 0.60);

    &--green {
      border: 2px solid  rgba(40, 167, 69, 0.60) !important;
    }

    @include phone {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
    }
  }
  &__text {
    font-size: 20px;
    line-height: 24px;
    white-space: pre-line;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;

    img {
      border-radius: 10px;
      align-self: stretch;
      height: 240px;
      width: 100%;
      object-fit: cover;
    }

    @include phone {
      grid-template-columns: 1fr;
      gap: 20px;
      img {
        aspect-ratio: 2/1;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    @include phone {
      gap: 20px;
    }
  }
  &__marsh {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__svg {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    background: #fff;
    border-radius: 200px;
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

  &__number {
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: 24px;
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
    margin-left: 10px;
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
    color: $c-yellow;
  }

  &__data-descr {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
}

.texti {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-left: 40px;
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.60);

  &--green {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(40, 167, 69, 0.60);
  }
}
</style>