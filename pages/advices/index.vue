<template>
  <div>
    <v-overlay :value="$fetchState.pending" z-index="999999">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#EF7F1A"
          indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div class="advices">
      <div class="container-1">
        <UiBreadcrumbs :links="links" />
        <UiHeading class="advices__title">{{ $t("header.advices") }}</UiHeading>
        <div class="advices__container">
          <div 
            class="advices__category" 
            v-for="category in categories" 
            :key="category.id"
            @click="$router.push(localePath(`/advices/${category.id}`))"
          >
            <div class="category__title">{{ category.title }}</div>
            <div class="category__data">
              <div class="category__info" v-for="info in category.recommendations" :key="info.id">
                <img :src="info.image" alt="info image" class="info__image" />
                <div class="info__text">
                  <div class="info__title">{{ info.title }}</div>
                  <div class="info__subtitle" v-html="info.text"></div>
                </div>
              </div>
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
export default {
  data() {
    return {
      categories: []
    }
  },
  async fetch() {
    await this.getCategories()
  },
  methods: {
    async getCategories() {
      this.categories = await this.$axios.$get('/categories/')
    }
  },
  computed: {
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
.advices {
  background-color: #F8FAFB;
  &__title {
    margin-bottom: 30px;
  }


  &__category {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
.container-1 {
  padding-bottom: 80px;
}

.category {
  &__title {
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 33.6px */
    letter-spacing: 0.084px;
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