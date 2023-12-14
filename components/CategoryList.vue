<template>
  <div class="category__data">
    <div
      class="category__info"
      v-for="info in recommendations"
      :key="info.id"
      @click="handleClick(info.id)"
    >
      <img :src="info.image" alt="info image" class="info__image" />
      <div class="info__text">
        <div class="info__title">{{ info.title }}</div>
        <div class="info__subtitle">{{ info.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  props: {
    recommendations: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(id) {
      this.$router.push(this.localePath(`/advices/${id}`));
    },
  },
};
</script>


<style lang="scss" scoped>
.category {
  &__title {
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
  &__data {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 30px;
    @include phone {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 430px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #fff;
    // height: 376px;
    cursor: pointer;
    @include phone {
      height: auto;
    }
  }
}

.info {
  &__image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
    @include phone {
      height: 154px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 20px 25px;
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
      line-height: 130%;
    }
  }
  &__subtitle {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    @include phone {
      font-size: 12px;
      line-height: 15px;
      -webkit-line-clamp: 5;
    }
  }
}
</style>