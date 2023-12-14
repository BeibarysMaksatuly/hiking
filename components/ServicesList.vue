<template>
  <div class="services__container">
    <div
      class="services__service"
      v-for="service in services"
      :key="service.id"
      @click="onServiceClick(service.id)"
    >
      <img :src="service.image" alt="service image" />
      <div class="service__text">{{ service.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesList",
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onServiceClick(serviceId) {
      this.$emit("service-clicked", serviceId);
    },
  },
};
</script>

<style lang="scss" scoped>
.services {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(361px, 1fr));
    grid-gap: 28px;
    padding-bottom: 120px;
    @include phone {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      grid-gap: 20px;
      padding-bottom: 80px;
    }
  }
  &__service {
    width: 100%;
    height: 400px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    &:hover {
      .service__text {
        height: 100%;
        background: rgba(7, 7, 7, 0.3);
        border-radius: 10px;
        color: #ffc107;
      }
    }
  }
}
.service {
  &__text {
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 82px;
    display: flex;
		align-items: flex-end;

    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    line-height: 26px;
    color: #fff;

    padding: 20px 20px 36px 20px;
    background: rgba(7, 7, 7, 0.5);
    border-radius: 0px 0px 10px 10px;
    transition: 0.3s;

    @include phone {
      height: 64px;
      font-size: 16px;
      line-height: 24px;
      padding: 16px 16px 24px 16px;
    }
  }
}
</style>
