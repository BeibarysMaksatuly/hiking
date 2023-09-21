<template>
  <div class="tours">
    <v-overlay :value="$fetchState.pending" z-index="999999">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#EF7F1A"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div class="container-1">
      <UiBreadcrumbs :links="links" />
      <div class="tours__data">
        <ToursFilter @filter="applyFilter" @open-modal="openModal" />
        <ToursInfo @change="changePagesize" :tours="tours" @open-modal="openModal"  />
      </div>
    </div>
    <ToursModal v-if="modalOpen" :tour="currentTour" @close-modal="modalOpen = false" />
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
        countries: [],
        seasons: [],
        tags: [],
        placements: [],
        direction: 1,
        "page[number]": this.$route.query["page[number]"] || 1,
        "page[size]": 9
      }
    }
  },
  async fetch() {
    if (this.$route.countries) {
      this.query.countries.append(this.$route.countries)
    }
    if (this.$route.seasons) {
      this.query.seasons.append(this.$route.seasons)
    }
    await this.getTours()
  },
  computed: {
    links() {
      return [
        {
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Туры',
          url: '/tours'
        }
      ]
    },
  },
  methods: {
    openModal(id) {
      this.modalOpen = true;
      this.currentTour = this.tours.find(tour => tour.id === id);
    },
    async getTours() {
      const result = await this.$axios.$get('/tours/', { params: {
        countries: this.query.countries.join(","),
        seasons: this.query.seasons.join(","),
        tags: this.query.tags.join(","),
        placements: this.query.placements.join(","),
        direction: 1,
        "page[number]": this.query["page[number]"],
        "page[size]": this.query["page[size]"]
      }} )
      this.tours = result.results
    },
    async changePagesize(val) {
      this.query["page[size]"] = val;
      await this.getTours()
    },
    async applyFilter(value) {
      this.query ={
        ...this.query,
        ...value
      }
      await this.getTours()
    }
  }
}
</script>
<style lang="scss" scoped>
.tours {
  background-color: #F8FAFB;
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