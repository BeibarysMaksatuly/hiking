<template>
  <div class="services">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <UiHeading class="services__title">{{ $t("header.services") }}</UiHeading>
      <ServicesList :services="services" />
    </div>
    <SharedTickets />
    <SharedInstagram />
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
      services: [],
    };
  },
  async fetch() {
    await this.getServices();
  },
  methods: {
    async getServices() {
      this.services = await this.$axios.$get("/services/");
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
          title: this.$t("header.services"),
          url: "/services",
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.services {
  background-color: #f8fafb;
  &__title {
    margin-bottom: 30px;
  }
}
</style>