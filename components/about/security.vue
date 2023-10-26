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
          <div class="security__descr">{{ $t("about.securityDescription") }}</div>
        </div>
        <div class="security__row-1">{{ $t("about.securityRow1") }}</div>
      </div>
      <div class="security__div">
        <div class="security__row">
          <div class="security__number">{{ $t("about.securityNumber1") }}</div>
          <div class="security__descr">{{ $t("about.securityDescription1") }}</div>
        </div>
          <div class="security__row-1">{{ $t("about.securityDescription2") }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.security {
  background-color: #fff;
  padding-top: 90px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  @include phone {
    flex-direction: column;
    gap: 70px;
    padding-top: 80px;
    padding-bottom: 80px;
  }

  &__cont {
    display: flex;
    flex-direction: column;
    gap: 40px;
    flex: 1;
  }
  &__cont-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    flex: 1;

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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 382px;
    color:  #7D92A1;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    @include phone {
      width: 100%;
    }

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

  &__div {
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 15px;
    align-self: stretch;
    border-radius: 5px;
    background-color: #F6F8FA;
    @include phone {
      align-items: flex-start;
    }
  }

  &__number {
    color: #0069B4;
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