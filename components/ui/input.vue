<template>
  <div class="input">
    <div class="input__label" v-if="label">
      {{ label }}
      <span class="red" v-if="required">*</span>
    </div>
    <input class="input__text" :bind="model" @input="$emit('update:model', $event.target.value)" />
    <slot name="icon"></slot>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: true
    },
    model: {
      type: String,
      default: ""
    }
  }
}
</script>
<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  &__label {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    @include phone {
      font-size: 16px;
    }
  }

  &__text {
    width: 100%;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px;
    border-radius: 10px;
    padding: 10px 15px;
    background-color: #F6F8FA;
    &:focus {
        outline: none;
    }
    &::placeholder {
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 21px;
    }
    @include phone {
      font-size: 16px;
    }
  }
}
</style>