<template>
  <div class="overlay">
    <div class="modal">
      <Close @click="$emit('close-modal')" class="modal__close" />
      <div class="modal__title">{{ tour.name }}</div>
      <div class="modal__places">
        <div class="modal__place" v-for="country in tour.country" :key="country.id">
          <div class="circle"></div>
          <div>{{ tour.country.name }}</div>
        </div>
      </div>
      <div class="modal__text">{{ tour.short_description }}</div>
      <UiButton>Отправить заявку</UiButton>
    </div>
  </div>
</template>
<script>
import Close from '@/assets/icons/close.svg?inline';
export default {
  props: {
    tour: {
      type: Object,
      required: true
    }
  },
  components: {
    Close
  },
}
</script>
<style lang="scss" scoped>
.overlay {
  background: rgba(21, 21, 21, 0.41);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 5px 15px 0px rgba(105, 112, 117, 0.10);
  position: relative;
  display: flex;
  width: 850px;
  padding: 40px 50px;
  flex-direction: column;
  gap: 20px;
  @include phone {
    width: 100%;
    padding: 20px;
    margin-left: 16px;
    margin-right: 16px;
  }

  &__close {
    width: 24px;
    height: 24px;
    color: $c-yellow;
    margin-left: auto;
  }

  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    @include phone {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 21px;
    }
  }
  &__places {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @include phone {
      gap: 5px;
    }
  }

  &__place  {
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 10px;
    border: 2px solid rgba(239, 127, 26, 0.60);

    @include phone {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 15px;
    }
  }
  &__text {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;

    @include phone {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 21px;
    }
  }
}
.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(239, 127, 26, 0.60);
}
</style>