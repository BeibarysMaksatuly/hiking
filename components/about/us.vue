<template>
  <div class="us container-1">
    <div class="us__container">
      <div class="us__title">{{ $t("about.aboutUs") }}</div>
      <div class="us__subtitle">{{ $t("about.partner") }}</div>
      <div class="us__text">{{ $t("about.company") }}</div>
    </div>
    <div class="us__images">
      <div class="us__duo">
        <img src="@/assets/images/image1.png" alt="1" />
        <img src="@/assets/images/image2.png" alt="2" />
      </div>
      <div class="us__three">
        <div>
          <img src="@/assets/images/image3.png" alt="1" />
          <div class="us__descr">{{ $t("about.description1") }}</div>
        </div>
        <div>
          <img src="@/assets/images/image4.png" alt="2" />
          <div class="us__descr">{{ $t("about.description2") }}</div>
        </div>
        <div>
          <img src="@/assets/images/image5.png" alt="2" />
          <div class="us__descr">{{ $t("about.description3") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.us {
  padding-top: 120px;
  padding-bottom: 120px;

  @include phone {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 837px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 70px;
    @include phone {
      margin-bottom: 50px;
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
    text-align: center;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: #7D92A1;
    @include phone {
      font-size: 14px;
    }
  }

  &__images {
    display: flex;
    flex-direction: column;
    gap: 70px;

    @include phone {
      gap: 51px;
    }
  }

  &__duo {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;

    img {
      height: 399px;
      width: 100%;
      object-fit: cover;
      @include phone {
        height: 200px;
        gap: 15px;
      }
    }
  }

  &__three {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 25px;
    justify-items: space-between;
     > div {
      position: relative;
      @include phone {
        height: 248px;
      }
     }

    @include phone {
      grid-template-columns: 1fr;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__descr {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 31px;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: #fff;
    z-index: 1;
    text-align: center;

    @include phone {
      padding: 25px 28px;
    }
  }
}
</style>