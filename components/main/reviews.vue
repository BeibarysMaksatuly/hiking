<template>
  <div class="reviews container-1">
    <UiHeading class="reviews__heading">{{ $t("main.reviews") }}</UiHeading>
    <div class="reviews__data">
      <div slot="button-prev" class="swiper-button-prev">
        <Arrow />
      </div>
      <img src="@/assets/images/reviews.png" alt="reviews" class="reviews__img" />
      <client-only>
        <swiper ref="reviewSwiper" class="reviewSwiper" :options="swiperOptions">
          <swiper-slide v-for="review in reviews" :key="review.id" class="review">
            <div class="review__data">
              <div class="review__name">{{ review.author }}, {{ review.author_age }} {{ $t("main.age") }}</div>
              <div class="review__tour"> {{ $t("main.tour") }}: <span>{{ review.tour.name }}</span></div>
              <div class="review__text">{{ review.text }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </client-only>
      <div class="reviews__squares">
        <div class="reviews__squares-top"></div>
        <div class="reviews__squares-bottom"></div>
      </div>
      <div slot="button-next" class="swiper-button-next">
        <Arrow />
      </div>
    </div>
  </div>
</template>
<script>
import Swiper, { Navigation } from 'swiper';
import Arrow from 'icons/btn-left.svg?inline';
Swiper.use([Navigation])
export default {
  components: {
    Arrow
  },
  name: 'MainReviews',
  async fetch() {
    await this.getReviews()
  },
  data() {
    return {
      reviews: [],
      swiperOptions: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  methods: {
    async getReviews() {
      this.reviews = await this.$axios.$get('/reviews/')
    }
  }
}
</script>
<style lang="scss" scoped>
.reviews {
  padding-top: 80px;
  padding-bottom: 78px;

  &__heading {
    margin-bottom: 50px;
  }

  &__data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 40px;

    @include phone {
      flex-direction: column;
    }
  }

  &__img {
    width: 486px;
    height: 481px;
    object-fit: cover;
    @include phone {
      width: 100%;
      height: 339.471px;
    }
  }

  &__squares {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include phone {
      flex-direction: row;
    }

    div {
      width: 39px;
      height: 39px;
      background-color: $c-orange;
    }

    &-top {
      border-radius: 0px 0px 0px 8px;

      @include phone {
        border-radius: 0px 8px 0px 0px;
      }
    }
    &-bottom {
      border-radius: 8px 0px 0px 0px;
    }
  }
}

.review {
  width: 100%;
  &__data {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  &__name {
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
  }

  &__tour {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    span {
      font-weight: 600;
      color: $c-orange;
    }
  }

  &__text {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    white-space: pre-line;
    @include phone {
      margin-bottom: 60px;
    }
  }
}

.reviewSwiper {
  width: 100%;
}
.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 1;
  background: #DDE1E6;
}
.swiper-button-prev,
.swiper-button-next {
  position: relative;
  color: #fff;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  color: #DDE1E6;
  border-radius: 130px;
  align-self: center;
  cursor: pointer;
  @include phone {
    bottom: 0;
  }
}

.swiper-button-next {
  transform: rotate(180deg);
}

// .swiper-button-prev {
//   right: 42px;
// }
</style>