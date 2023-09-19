<template>
  <button :class="`button-${type}`">
    <slot/>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }

}
</script>
<style lang="scss" scoped>
.button-primary {
  outline: none;
  width: 100%;
  transition: all 0.3s ease;
  background-color: $c-yellow;
  color: $c-white;
  padding: 11px 24px;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  &:hover {
    background-color: $c-orange;
  }
}
.button-error {
  outline: none;
  width: 100%;
  transition: all 0.3s ease;
  background-color: transparent;
  color: $c-red;
  padding: 11px 24px;
  border: 1px solid $c-red;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  &:hover {
    background-color: $c-red;
    color: $c-white;
  }
}

.button-outlined {
  outline: none;
  width: 100%;
  transition: all 0.3s ease;
  background-color: transparent;
  color: $c-yellow;
  padding: 11px 24px;
  border: 1px solid $c-yellow;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  &:hover {
    background-color: $c-yellow;
    color: $c-white;
  }
}
</style>