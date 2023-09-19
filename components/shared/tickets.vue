<template>
  <div class="tickets">
    <div class="container-1">
      <div class="tickets__data">
        <UiHeading class="data__title">
          Купить билеты до Алтая
        </UiHeading>
        <iframe 
          src="https://aviata.kz/static/widget/search/widget.html?lang=ru" 
          class="data__iframe"
        />
      </div>
    </div>
    <div class="tickets__image">
      <img src="@/assets/images/tickets.png" alt="tickets" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tickets {
  position: relative;
  background-color: #FFF;

  &__data {
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    height: 880px;
    @include phone {
      width: 100%;
      padding-top: 264px;
      height: auto;
      padding-bottom: 50px;
    }
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 558px;
    height: 880px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include phone {
      height: 214.325px;
      width: 100%;
      bottom: auto;
      top: 0;
    }
  }
}
.container-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 102px;
  @include phone {
    flex-direction: column-reverse;
    gap: 0;
  }
}
.data {
  &__title {
    margin-bottom: 55px;
  }

  &__iframe {
    width: 100%; 
    min-width: 280px; 
    min-height: 535px;
    border: none; 
    overflow: hidden; 
    padding: 30px 40px;
    border-radius: 10px;
    @include phone {
      padding: 0;
    }
  }
}
</style>