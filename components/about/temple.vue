<template>
  <div class="temple">
    <div class="container-1">
      <div class="temple__cont">
        <div class="temple__title">{{ $t("about.history") }}</div>
        <div class="temple__subtitle">{{ $t("about.partner1") }}</div>
        <div class="temple__text">{{ $t("about.templeText") }}</div>
      </div>
    </div>
    <img src="@/assets/images/temple.png" alt="temple"/>
  </div>
</template>
<style lang="scss" scoped>
.temple {
  height: 591px;
  background-color: #F6F8FA;
  position: relative;
  @include phone {
    height: 1101px;
  }


  img {
    width: 760px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    @include phone {
      width: 100%;
      height: 591px;
    }
  }

  &__cont {
    width: 465px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @include phone {
      width: 100%;
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
    color:  #7D92A1;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    @include phone {
      font-size: 18px;
    }
  }
}

.container-1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  @include phone {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 641px;
  }
}
</style>