<template>
  <div class="security container-1">
    <div class="security__cont">
      <div class="security__subtitle">{{ $t("about.securitySubtitle") }}</div>
      <div class="security__title">{{ $t("about.securityTitle") }}</div>
    </div>
    <div class="security__cont-1">
      <div class="security__div">
        <div class="security__row">
          <div class="security__number">{{ $t("about.securityNumber") }}</div>
          <div class="security__descr">
            {{ $t("about.securityDescription") }}
          </div>
        </div>
        <div class="security__row-1">{{ $t("about.securityRow1") }}</div>
      </div>
      <div class="security__div">
        <div class="security__row">
          <div class="security__number">{{ $t("about.securityNumber1") }}</div>
          <div class="security__descr">
            {{ $t("about.securityDescription1") }}
          </div>
        </div>
        <div class="security__row-1">
          {{ $t("about.securityDescription2") }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.security {
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #fff;
  padding-top: 90px;
  padding-bottom: 90px;
  gap: 15px;
  @include phone {
    flex-direction: column;
    gap: 70px;
    padding-top: 80px;
    padding-bottom: 80px;
    align-items: flex-start;
  }

  &__cont {
    display: flex;
    flex-direction: column;
    gap: 40px;
    flex: 1;
  }
  &__subtitle {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &__title {
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }

  &__cont-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    flex: 1;
  }
  &__div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    padding: 20px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f6f8fa;
    @include phone {
      align-items: flex-start;
    }
  }
  &__row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    @include phone {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__row-1 {
    width: 382px;
    color: #7d92a1;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    @include phone {
      width: 100%;
    }
  }

  &__number {
    color: #0069b4;
    text-align: right;
    font-size: 50px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 124px;
    @include phone {
      width: min-content;
    }
  }

  &__descr {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
}
</style>