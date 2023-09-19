<template>
  <div>
    <div class="advices">
      <div class="container-1">
        <UiBreadcrumbs :links="links" />
        <UiHeading class="advices__title">Советы</UiHeading>
        <div class="advices__container">
          <div class="advices__category" v-for="category in categories" :key="category.id">
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
          title: 'Главная',
          url: '/'
        },
        {
          title: 'Советы',
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
  }
  &__data {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 20px;
    row-gap: 30px;
  }

  &__info {
    border-radius: 10px;
    background-color: #fff;
    height: 376px;
    border-radius: 15px 15px 0px 0px;
  }
}

.info {
  &__image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 15px 15px 0px 0px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-bottom: 2px;
  }
  &__subtitle {
    height: 72px;
    overflow: hidden;
    word-wrap: normal;
    text-overflow: ellipsis;

    &::after {
      content: "..."
    }
  }
}
</style>