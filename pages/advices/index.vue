<template>
  <div class="advices">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <UiHeading class="advices__title">{{ $t("header.advices") }}</UiHeading>
      <div class="advices__container">
        <div
          class="advices__category"
          v-for="category in categories"
          :key="category.id"
        >
          <div class="category__title">{{ category.title }}</div>
          <CategoryList :recommendations="category.recommendations" />
        </div>
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
export default {
  data() {
    return {
      categories: [],
    };
  },
  async fetch() {
    await this.getCategories();
  },
  methods: {
    async getCategories() {
      this.categories = await this.$axios.$get("/categories/");
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
.advices {
  background-color: #f8fafb;
  &__title {
    margin-bottom: 30px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  &__category {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
.container-1 {
  padding-bottom: 80px;
  @include phone {
    padding-bottom: 140px;
  }
}

.category__title {
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 33.6px */
  letter-spacing: 0.084px;
  @include phone {
    font-size: 20px;
    letter-spacing: 0.06px;
  }
}
</style>