<template>
  <div class="heading">
    <div class="heading__title"><slot/></div>
    <div class="heading__line"></div>
  </div>
</template>
<style lang="scss" scoped>
.heading {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 50.4px */
    letter-spacing: 0.126px;
    margin-bottom: 32px;

    @include phone {
      font-size: 24px;
      margin-bottom: 12px;
    }
  }

  &__line {
    width: 280px;
    height: 8px;
    background-color: $c-orange;
  }
}
</style>