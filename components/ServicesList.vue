<template>
  <div class="services__container">
    <div
      class="services__service"
      v-for="service in services"
      :key="service.id"
      @click="onServiceClick(service.id)"
    >
      <img :src="service.image" alt="service image" />
      <!-- <div class="service__overlay"></div> -->
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
    grid-template-columns: repeat(auto-fit, minmax(364px, 1fr));
    grid-gap: 22.5px;
    padding-bottom: 80px;
    @include phone {
      grid-template-columns: repeat(auto-fit, minmax(164px, 1fr));
      column-gap: 15px;
      row-gap: 20px;
    }
  }
  &__service {
    width: 100%;
    height: 400px;
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
      // .service__overlay:before {
      //   opacity: 1;
      // }
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
  // &__overlay {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   z-index: 1;
  //   border-radius: 10px;
  //   background: linear-gradient(
  //     1deg,
  //     rgba(0, 0, 0, 0.54) -16.13%,
  //     rgba(255, 255, 255, 0) 75.69%
  //   );
  //   &:before {
  //     content: "";
  //     display: block;

  //     opacity: 0;
  //     transition: opacity 0.3s ease;

  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     z-index: 2;
  //     border-radius: 10px;
  //     background: linear-gradient(
  //       180deg,
  //       rgba(0, 0, 0, 0) 0%,
  //       rgba(0, 0, 0, 0.6) 100%
  //     );
  //   }
  // }

  &__text {
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 82px;

    display: flex;
    align-items: flex-end;

    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    color: #fff;

    padding: 28px 18px;
    background: rgba(7, 7, 7, 0.5);
    border-radius: 0px 0px 10px 10px;
    transition: 0.3s;

    @include phone {
      font-size: 16px;
      line-height: 21px;
      height: 60px;
      padding: 20px 10px;
    }
  }
}
</style>
