<template>
  <div class="team">
    <div class="container-1">
      <div class="team__title">{{ $t("about.teamTitle") }}</div>
      <div class="team__subtitle">{{ $t("about.teamSubtitle") }}</div>
      <img src="@/assets/images/team.png" alt="team photo" class="team__photo" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.team {
  background-color: #F8FAFB;

  &__title {
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-bottom: 20px;
    text-align: center;
    @include phone {
      font-size: 24px;
    }
  }

  &__subtitle {
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 70px;
    color: #7D92A1;
    @include phone {
      font-size: 14px;
    }
  }

  &__photo {
    height: 868px;
    width: 100%;
    object-fit: cover;
    @include phone {
      height: 458px;
    }
  }
}
.container-1 {
  padding-top: 120px;
  padding-bottom: 120px;
  @include phone {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}
</style>