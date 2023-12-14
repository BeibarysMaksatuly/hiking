<template>
  <div class="tours">
    <div class="tours__title">
      {{ $t("main.tours.selectTour") }}
    </div>
    <ServicesList
      :services="formats"
      @service-clicked="serviceClicked"
      class="container-1"
    />
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.getFormats();
  },
  data() {
    return {
      formats: [],
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
  padding-top: 80px;
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
}

.container-1 {
  max-width: 1280px;
}
</style>