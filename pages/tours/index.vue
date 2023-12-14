<template>
  <div class="tours">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <div class="tours__data">
        <ToursFilter @filter="getTours" @open-modal="openModal" />
        <ToursInfo
          @change="changePagesize"
          :tours="tours"
          @open-modal="openModal"
        />
      </div>
    </div>
    <ToursModal
      v-if="currentTour"
      :tour="currentTour"
      :modalOpen="modalOpen"
      @close-modal="modalOpen = false"
    />
    <v-overlay :value="loading" z-index="999999">
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
      tours: [],
      modalOpen: false,
      currentTour: 0,
      loading: false,
    };
  },
  computed: {
    links() {
      return [
        {
          title: this.$t("header.main"),
          url: "/",
        },
        {
          title: this.$t("header.tours"),
          url: "/tours",
        },
      ];
    },
  },
  methods: {
    openModal(id) {
      this.modalOpen = true;
      this.currentTour = this.tours.find((tour) => tour.id === id);
    },
    async getTours(query) {
      this.loading = true;
      const result = await this.$axios.$get("/tours/", {
        params: {
          formats: query.formats.join(","),
          countries: query.countries.join(","),
          seasons: query.seasons.join(","),
          placements: query.placements.join(","),
          duration_start: query.duration[0],
          duration_end: query.duration[1],
          budget_start: query.budget[0],
          budget_end: query.budget[1],
          "page[number]": query["page[number]"],
          "page[size]": query["page[size]"],
        },
      });
      this.tours = result.results;
      this.loading = false;
    },
    async changePagesize(val) {
      this.query["page[size]"] = val;
      await this.getTours();
    },
  },
};
</script>
<style lang="scss" scoped>
.tours {
  background-color: #f8fafb;
  &__data {
    width: 100%;
    display: grid;
    grid-template-columns: 270px 1fr;
    gap: 47px;
    @include phone {
      display: flex;
      grid-template-columns: unset;
      flex-direction: column;
    }
  }
}
.container-1 {
  padding-bottom: 71px;
  max-width: 1280px;
}
</style>