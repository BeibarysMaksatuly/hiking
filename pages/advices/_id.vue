<template>
  <div class="advice">
    <v-overlay :value="$fetchState.pending" z-index="999999">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#EF7F1A"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="advice__hero">
      <img :src="category.image" alt="category image" />
    </div>
    <div class="container-1">
      <UiHeading class="advice__title">{{ $t("header.advices") }}</UiHeading>
      <client-only>
        <swiper :pagination="true"  class="adviceSwiper" :options="swiperOptions">
          <swiper-slide v-for="file in category.files" :key="file.id" class="advice__photo">
            <img :src="file.file" alt="mini photo" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" />
        </swiper>
      </client-only>
      <div class="advice__text" v-html="category.text"></div>
      <div class="advice__other" v-if="otherCategories && otherCategories.length">
        <div class="category__title">{{ $t("advices.otherAdvices") }}</div>
          <div class="category__data">
            <div class="category__info" 
              v-for="info in otherCategories" 
              :key="info.id"
              @click="$router.push(localePath(`/advices/${info.id}`))"
            >
              <img :src="info.image" alt="info image" class="info__image" />
              <div class="info__text">
                <div class="info__title">{{ info.title }}</div>
                <div class="info__subtitle" v-html="info.text"></div>
              </div>
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
      category: {},
      otherCategories: [],
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
    await this.getCategory()
    await this.otherCatgories()
  },
  methods: {
    async getCategory() {
      this.category = await this.$axios.$get(`/recommendation/${this.id}/`)
    },
    async otherCatgories() {
      this.otherCategories = await this.$axios.$get('/exclude/', { params: { recommendation_id: this.id } })
      console.log(this.otherCategories)
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    },
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: '/'
        },
        {
          title: this.$t("header.advices"),
          url: '/advices'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.advice {
  background-color: #F8FAFB;

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
  &__title {
    margin-bottom: 40px;
  }

  &__photo {
    width: 100%;
    height: 171px;
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
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
    margin-top: 40px;
    padding-bottom: 160px;
    @include phone {
      padding-bottom: 80px;
    }
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 20px;
    row-gap: 30px;
    @include phone {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__info {
    border-radius: 10px;
    background-color: #fff;
    height: 376px;
    border-radius: 15px 15px 0px 0px;
    @include phone {
      height: 305px;
    }
  }
}

.info {
  &__image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 15px 15px 0px 0px;
    @include phone {
      height: 154px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-bottom: 2px;
    @include phone {
      padding: 10px;
    }
  }
  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 15px;
    @include phone {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 130%;
    }
  }
  &__subtitle {
    height: 72px;
    overflow: hidden;
    word-wrap: normal;
    text-overflow: ellipsis;

    &::after {
      content: "..."
    }
    @include phone {
      height: 90px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
    }
  }
}
</style>