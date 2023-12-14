<template>
  <div class="advantages">
    <div v-for="advantage in advantages" :key="advantage.id">
      <img :src="advantage.icon" alt="" />
      <p>{{ advantage.title }}</p>
      <span>{{ advantage.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      advantages: [],
    };
  },
  async fetch() {
    this.advantages = await this.$axios.$get("/advantages/");
  },
};
</script>

<style lang="scss" scoped>
.advantages {
  width: 100%;
  background: #f8fafb;
  padding: 48px 16px 60px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  @include phone {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(197px, 1fr));
    padding: 44px 16px 80px;
  }
  div {
    width: 100%;
    max-width: 197px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include phone {
      max-width: 100%;
    }
    img {
      width: 28px;
      height: 28px;
      margin-bottom: 12px;
    }
    p {
      color: #324552;
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 8px;
      @include phone {
        font-size: 16px;
      }
    }
    span {
      color: #324552;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>