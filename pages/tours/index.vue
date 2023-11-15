<template>
  <div class="tours">
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <div class="tours__data">
        <ToursFilter
          @filter="applyFilter"
          @open-modal="openModal"
          :filters="query"
        />
        <ToursInfo
          @change="changePagesize"
          :tours="tours"
          @open-modal="openModal"
        />
      </div>
    </div>
    <ToursModal
      v-if="modalOpen"
      :tour="currentTour"
      @close-modal="modalOpen = false"
    />
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
      tours: [],
      modalOpen: false,
      currentTour: 0,
      query: {
        formats: [],
        countries: [],
        seasons: [],
        tags: [],
        placements: [],
        direction: null,
        budget: [0, 0],
        duration: [0, 0],
        "page[number]": this.$route.query["page[number]"] || 1,
        "page[size]": 9,
      },
    };
  },
  async fetch() {
    if (this.$route.query.formats) {
      this.query.formats.push(Number(this.$route.query.formats));
    }
    if (this.$route.query.countries) {
      this.query.countries.push(Number(this.$route.query.countries));
    }
    if (this.$route.query.seasons) {
      this.query.seasons.push(Number(this.$route.query.seasons));
    }
    await this.getMaxMinData();
    await this.getTours();
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
    async getMaxMinData() {
      const data = await this.$axios.$get("/tour-filter-data/");
      const maxTime = data.max_date || 0;
      const minTime = data.min_date || 0;
      const maxBudget = data.max_price || 0;
      const minBudget = data.min_price || 0;
      this.query.budget = [minBudget, maxBudget];
      this.query.duration = [minTime, maxTime];
    },
    async getTours() {
      const result = await this.$axios.$get("/tours/", {
        params: {
          formats: this.query.formats.join(","),
          countries: this.query.countries.join(","),
          seasons: this.query.seasons.join(","),
          tags: this.query.tags.join(","),
          placements: this.query.placements.join(","),
          direction: this.query.direction,
          duration_start: this.query.duration[0],
          duration_end: this.query.duration[1],
          budget_start: this.query.budget[0],
          budget_end: this.query.budget[1],
          "page[number]": this.query["page[number]"],
          "page[size]": this.query["page[size]"],
        },
      });
      this.tours = result.results;
    },
    async changePagesize(val) {
      this.query["page[size]"] = val;
      await this.getTours();
    },
    async applyFilter(value) {
      this.query = {
        ...this.query,
        ...value,
      };
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
    display: flex;
    gap: 24px;
    @include phone {
      flex-direction: column;
    }
  }
}
.container-1 {
  padding-bottom: 71px;
}
</style>