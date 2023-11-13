<template>
  <div class="specialists">
    <div class="container-1">
      <div class="specialists__title">{{ $t("about.specialistsTitle") }}</div>
      <div class="specialists__subtitle">
        {{ $t("about.specialistsSubtitle") }}
      </div>
      <client-only>
        <div class="specialists__swiper">
          <div slot="button-prev" class="swiper-button-prev">
            <Arrow />
          </div>
          <swiper
            ref="specialistsSwiper"
            class="swiperSpec"
            :options="swiperOptions"
          >
            <swiper-slide
              v-for="(specialist, idx) in computedSpecialists"
              :key="idx"
              class="specialist"
            >
              <div
                class="specialist__data"
                v-for="(spec, i) in specialist"
                :key="spec.id"
                :class="{ reverse: i % 2 != 0 }"
              >
                <div class="specialist__info">
                  <div class="specialist__name">{{ spec.full_name }}</div>
                  <div class="specialist__work">
                    Опыт работы: {{ spec.experience }} лет
                  </div>
                  <div class="specialist__descr">{{ spec.description }}</div>
                </div>
                <div class="specialist__photo">
                  <img :src="spec.image" alt="specialist" />
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div slot="button-next" class="swiper-button-next">
            <Arrow />
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>
<script>
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
import Arrow from "icons/chevron-right.svg?inline";
export default {
  components: {
    Arrow,
  },
  data() {
    return {
      specialists: [],
      swiperOptions: {
        autoHeight: true,
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  async fetch() {
    await this.getSpecialists();
  },
  computed: {
    computedSpecialists() {
      const arr = [];
      for (let i = 0; i < this.specialists.length; i += 2) {
        const hey = [];
        hey.push(this.specialists[i]);
        if (this.specialists[i + 1]) hey.push(this.specialists[i + 1]);
        arr.push(hey);
      }
      return arr;
    },
  },
  methods: {
    async getSpecialists() {
      try {
        this.specialists = await this.$axios.$get("/specialists/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.swiperSpec {
  width: 100%;
}
.container-1 {
  padding-top: 90px;
  padding-bottom: 90px;

  @include phone {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}
.specialists {
  &__title {
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-bottom: 20px;
    text-align: center;
    @include phone {
      font-size: 24px;
    }
  }

  &__subtitle {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #7d92a1;
    margin-bottom: 70px;
    text-align: center;
    @include phone {
      font-size: 16px;
      margin-bottom: 40px;
    }
  }
  &__swiper {
    display: flex;
    flex-direction: row;
    gap: 30px;
    align-items: center;
    @include phone {
      gap: 10px;
    }
  }
}

.reverse {
  flex-direction: row-reverse !important;
  @include phone {
    flex-direction: column-reverse !important;
  }
}

.specialist {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    height: 300px;

    padding: 20px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f6f8fa;
    @include phone {
      flex-direction: column;
      height: max-content;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__name {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  &__work {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  &__descr {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__photo {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
    img {
      flex-shrink: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    @include phone {
      width: 100%;
      height: 300px;
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  position: relative;
  width: 42px;
  height: 42px;
  color: $c-orange;
  margin: 0;
}

.swiper-button-prev {
  transform: rotate(180deg);
}

.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}
.swiper-button-prev {
  left: 0px;
  right: auto;
}
.swiper-button-next {
  right: 0px;
  left: auto;
}
</style>