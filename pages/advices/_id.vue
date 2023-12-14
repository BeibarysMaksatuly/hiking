<template>
  <div class="advice">
    <UiBreadcrumbs :links="links" class="container-1" />
    <div class="advice__hero">
      <img :src="category.detail_image" alt="category image" />
      <p class="container-1">{{ category.inside_text }}</p>
    </div>
    <div class="container-1">
      <UiHeading class="advice__title">{{ $t("header.advices") }}</UiHeading>
      <client-only>
        <swiper :pagination="true" :options="swiperOptions">
          <swiper-slide
            v-for="file in category.files"
            :key="file.id"
            class="advice__photo"
          >
            <img :src="file.file" alt="mini photo" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" />
        </swiper>
      </client-only>
      <div class="advice__text" v-html="category.text"></div>
      <div
        class="advice__other"
        v-if="otherCategories && otherCategories.length"
      >
        <div class="category__title">{{ $t("advices.otherAdvices") }}</div>
        <CategoryList :recommendations="otherCategories" />
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
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
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
    };
  },
  async fetch() {
    await this.getCategory();
    await this.otherCatgories();
  },
  methods: {
    async getCategory() {
      this.category = await this.$axios.$get(
        `/recommendation/${this.$route.params.id}/`
      );
    },
    async otherCatgories() {
      this.otherCategories = await this.$axios.$get("/exclude/", {
        params: { recommendation_id: this.$route.params.id },
      });
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
          title: this.$t("header.advices"),
          url: "/advices",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.advice {
  background-color: #f8fafb;
  &__hero {
    position: relative;
    width: 100%;
    height: 400px;
    margin-bottom: 80px;

    @include phone {
      height: 300px;
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

  &__photo {
    width: 100%;
    height: 420px;
    border-radius: 10px;
    @include phone {
      height: 250px;
    }
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    white-space: pre-line;
    margin-top: 40px;
    margin-bottom: 160px;
    @include phone {
      margin-bottom: 80px;
    }
  }

  &__other {
    padding-bottom: 80px;
  }
}

.category__title {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 33.6px */
  letter-spacing: 0.084px;
  margin-bottom: 40px;
  @include phone {
    font-size: 20px;
    letter-spacing: 0.06px;
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
  background: $c-white;
  opacity: 1;
}
</style>