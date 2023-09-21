<template>
  <div class="tour">
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="tour__cont">
      <div class="tour__hero">
        <img :src="tour.main_image" alt="main image" class="tour__image" />
        <div class="tour__title">{{ tour.name }}</div>
      </div>
      <UiHeading class="tour__heading container-1">О Туре</UiHeading>
      <div class="tour__places container-1">
        <div class="tour__place" v-for="country in tour.country" :key="country.id">
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
      </div>
      <div class="tour__text container-1" v-html="tour.description"></div>
      <div class="container-1 tour__images">
        <img v-for="(image, idx) in tour.images" :key="idx" :src="image.image" alt="image" />
      </div>
      <div class="tour__info container-1">
        <div class="tour__marsh">
          <Map class="tour__svg" />
          <div class="tour__titled">Маршрут тура:</div>
        </div>
        <div class="tour__data">
          {{ tour.route }}
        </div>
      </div>
      <div class="tour__double container-1">
        <div class="tour__info">
          <div class="tour__marsh">
            <CreditCard class="tour__svg" />
            <div class="tour__titled">Варианты стоимости тура:</div>
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
            <div class="tour__titled">Маршрут тура:</div>
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
      <UiHeading class="program__title">Программа тура</UiHeading>
      <div class="program__data">
        <UiBread v-for="data in tour.programs"></UiBread>
      </div>
    </div>
  </div>
</template>
<script>
import Map from '@/assets/icons/map-1.svg?inline';
import Calendar from '@/assets/icons/calendar-1.svg?inline';
import CreditCard from '@/assets/icons/credit-card-1.svg?inline';
export default {
  components: {
    Map, Calendar, CreditCard
  },
  data() {
    return {
      tour: {}
    }
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
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Туры',
          url: '/tours'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.program {
}
.tour {
  background-color: #F8FAFB;

  &__program {
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    gap: 40px;
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
</style>