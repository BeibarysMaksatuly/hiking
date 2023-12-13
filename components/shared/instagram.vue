<template>
  <div class="instagram">
    <div class="hello">
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
  </div>
</template>

<style lang="scss" scoped>
.instagram {
  background-color: #f8fafb;
  overflow: hidden;
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
    margin: 30px 0;
    @include phone {
      margin: 20px 0 40px;
    }
  }

  &__images {
    width: 100%;
    height: 294px;
    img {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }
}
.hello {
  padding-top: 99px;
  padding-bottom: 54px;
  display: flex;
  flex-direction: column;
  @include phone {
    padding: 80px 0;
  }
}
</style>