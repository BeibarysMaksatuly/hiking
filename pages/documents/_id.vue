<template>
  <div class="documents">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <UiHeading class="documents__title">{{ document.title }}</UiHeading>
      <div v-html="document.text"></div>
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
      document: {},
    };
  },
  async fetch() {
    this.document = await this.$axios.$get(
      `/documents/${this.$route.params.id}`
    );
  },
  computed: {
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: "/",
        },
        {
          title: this.document.title,
          url: "/",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.documents {
  padding-bottom: 80px;
  &__title {
    margin-bottom: 40px;
  }
}
</style>