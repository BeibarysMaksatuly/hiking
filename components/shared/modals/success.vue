<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__svg">
        <Close v-if="!success" class="modal__svg--fail"  />
        <Check v-else class="modal__svg--success" />
      </div>
      <div class="modal__text">
        <div class="text__title">
          {{ success ? 'Ваша заявка была отправлена' : 'Что-то пошло не так :(' }}
        </div>
        <div class="text__subtitle">{{ success 
        ? 'Заявка была отправлена - мы обязательно с вами свяжемся :)'  
        : 'Не удалось отправить заявку, пожалуйста, повторите позже' }}</div>
      </div>
      <UiButton @click.native="$emit('close')" :class="['modal__button', !success && 'modal__button--fail']">{{ success ? 'Готово' : 'Хорошо' }}</UiButton>
    </div>
  </div>
</template>
<script>
import Close from '@/assets/icons/close.svg?inline';
import Check from '@/assets/icons/check.svg?inline';
export default {
  props: {
    success: {
      type: Boolean,
      required: true
    }
  },
  components: {
    Close,Check
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
  border-radius: 10px;
  background: #FFF;
  position: relative;
  display: flex;
  width: 480px;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  @include phone {
    width: 100%;
    padding: 20px;
    margin-left: 16px;
    margin-right: 16px;
  }
  &__svg {
    width: 104px;
    height: 104px;

    &--fail {
      color: #DC3545;
    }
  }

  &__text {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }

  &__button {
    width: 100%;

    &--fail {
      background-color: #DC3545;
    }
  }
}

.text {

  &__title {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    text-align: center;
  }

  &__subtitle {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; 
    text-align: center;
  }
}
</style>