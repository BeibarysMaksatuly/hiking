<template>
  <div class="instagram">
    <div class="container-1">
      <UiHeading>
        <span>{{ $t("main.instagram.ourInsta") }} - </span
        ><a
          href="https://instagram.com/campinglife.kz?igshid=enN5MWVnaG9mMWs="
          target="_blank"
          class="instagram__title"
          >@campinglife.kz</a
        >
      </UiHeading>
      <div class="instagram__text">
        {{ $t("main.instagram.subscribe") }}
      </div>
    </div>
    <div class="instagram__images">
      <img src="@/assets/images/insta.png" alt="instagram image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.instagram {
  background-color: #f8fafb;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: 100px;
  @include phone {
    padding-bottom: 80px;
  }
  &__title {
    background: linear-gradient(90deg, #ef7f1a 54.05%, #fecc01 99.86%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;

    @include phone {
      font-size: 24px;
    }
  }

  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    margin: 16px 0 48px;
    @include phone {
      font-size: 16px;
      margin: 10px 0 16px;
    }
  }

  &__images {
    width: 100%;
    height: 294px;
    @include phone {
      height: 248px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.container-1 {
  max-width: 1280px;
}
</style>