<template>
  <div class="about__hero">
    <div class="hero__overlay"></div>
    <img 
      src="@/assets/images/about.png" 
      alt="about data"
      class="hero__image" 
      /> 
    <div class="hero__text container-1">{{ $t("about.title") }}</div>
  </div>
</template>
<style lang="scss" scoped>
.about {
  &__hero {
    height: 610px;
    width: 100%;
    position: relative;

    @include phone {
      height: 655px;
    }
  }
}

.hero {
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__overlay {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);
  }

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #fff;
    text-align: center;
    z-index: 3;

    @include phone {
      font-size: 26px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
}
</style>