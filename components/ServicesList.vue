<template>
  <div class="services__container">
    <div
      class="services__service"
      v-for="service in services"
      :key="service.id"
      @click="navigateToService(service.id)"
    >
      <img :src="service.image" alt="service image" />
      <div class="service__overlay"></div>
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
    navigateToService(serviceId) {
      this.$router.push(this.localePath(`/services/${serviceId}`));
    },
  },
};
</script>

<style lang="scss" scoped>
.services {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(266px, 1fr));
    column-gap: 25px;
    row-gap: 30px;
    padding-bottom: 80px;
    @include phone {
      grid-template-columns: repeat(auto-fit, minmax(164px, 1fr));
      column-gap: 15px;
      row-gap: 20px;
    }
  }
  &__service {
    width: 100%;
    height: 470px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    @include phone {
      height: 300px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    &:hover {
      .service__overlay:before {
        opacity: 1;
      }
      .service__text {
        color: #ffc107;
      }
    }
  }
}
.service {
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 10px;
    background: linear-gradient(
      1deg,
      rgba(0, 0, 0, 0.54) -16.13%,
      rgba(255, 255, 255, 0) 75.69%
    );
    &:before {
      content: "";
      display: block;

      opacity: 0;
      transition: opacity 0.3s ease;

      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      border-radius: 10px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6) 100%
      );
    }
  }

  &__text {
    position: absolute;
    bottom: 30px;
    left: 30px;
    right: 30px;
    z-index: 2;

    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    color: #fff;
    transition: 0.3s;
    @include phone {
      bottom: 20px;
      left: 10px;
      right: 10px;

      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
