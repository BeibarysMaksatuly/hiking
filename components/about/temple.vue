<template>
  <div class="temple">
    <div class="container-1">
      <div class="temple__cont">
        <div class="temple__title">Наша История</div>
        <div class="temple__subtitle">Ваш надежный партнер в турах по Алтаю</div>
        <div class="temple__text">Компания занимается не только организацией туров, но и активно пропагандирует красоты Алтая, его экологические и культурные ценности через социальные сети, блоги и другие каналы связи. Это помогает привлечь больше людей, заинтересованных в посещении этого уникального региона. Таким образом, компания, специализирующаяся на турах по Алтаю, является надежным партнером для всех, кто хочет познакомиться с этим прекрасным уголком природы, насладиться активным отдыхом и погрузиться в местную культуру и традиции.</div>
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