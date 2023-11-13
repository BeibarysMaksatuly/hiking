<template>
  <div class="temple">
    <img src="@/assets/images/temple.png" alt="temple" />
    <div class="cont_block">
      <div class="temple__cont">
        <div class="temple__title">{{ $t("about.history") }}</div>
        <div class="temple__subtitle">{{ $t("about.partner1") }}</div>
        <div class="temple__text">{{ $t("about.templeText") }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.temple {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #f6f8fa;
  @include phone {
    flex-direction: column;
  }
  img {
    width: 52.7%;
    height: 591px;
    object-fit: cover;
    @include phone {
      width: 100%;
    }
  }
  .cont_block {
    display: flex;
    align-items: center;
  }

  &__cont {
    width: 465px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 60px;
    @include phone {
      width: 100%;
      padding: 50px 16px 80px;
    }
  }

  &__title {
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    @include phone {
      font-size: 24px;
    }
  }

  &__subtitle {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    @include phone {
      font-size: 14px;
    }
  }

  &__text {
    color: #7d92a1;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    @include phone {
      font-size: 18px;
    }
  }
}
</style>