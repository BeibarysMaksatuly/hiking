<template>
  <div class="instagram">
    <div class="hello">
      <UiHeading class="container-1">
        <span>{{ $t("main.instagram.ourInsta") }} -</span><span class="instagram__title">@camping.life</span>
      </UiHeading>
      <div class="instagram__text container-1">{{ $t("main.instagram.subscribe") }}</div>
      <div class="instagram__images">
        <div class="instagram__image" v-for="i in 3" :key="i">
          <img src="@/assets/images/insta.png" alt="instagram image" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.instagram {
  background-color: #F8FAFB;

  &__title {
    background: linear-gradient(90deg, #EF7F1A 54.05%, #FECC01 99.86%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }

  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
  }

  &__images {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.hello {
  padding-top: 99px;
  padding-bottom: 54px;
  display: flex;
  flex-direction: column;
  gap: 30px; 
}
</style>